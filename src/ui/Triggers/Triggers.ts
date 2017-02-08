import { Component } from '../Base/Component';
import { IComponentBindings } from '../Base/ComponentBindings';
import { ComponentOptions } from '../Base/ComponentOptions';
import { Assert } from '../../misc/Assert';
import { QueryEvents, IQuerySuccessEventArgs } from '../../events/QueryEvents';
import { ITriggerNotify, ITriggerExecute, ITriggerRedirect, ITriggerQuery, ITrigger } from '../../rest/Trigger';
import { $$ } from '../../utils/Dom';
import { IAnalyticsTriggerNotify, analyticsActionCauseList, IAnalyticsTriggerRedirect, IAnalyticsTriggerQuery, IAnalyticsTriggerExecute } from '../Analytics/AnalyticsActionListMeta';
import { QueryStateModel } from '../../models/QueryStateModel';
import { Initialization } from '../Base/Initialization';
import _ = require('underscore');

export interface ITriggersOptions {
}

/**
 * The Triggers component enables the use of triggers (`notify`, `execute`, `query`, `redirect`) generated by the Coveo
 * Search API (see [Trigger](https://developers.coveo.com/x/lIM9AQ)) in the query pipeline (see
 * [Managing the Query Pipeline](https://developers.coveo.com/x/KYOy)).
 */
export class Triggers extends Component {
  static ID = 'Triggers';
  static options: ITriggersOptions = {};

  /**
   * The list of notifications returned by the Search API for the current query (via `notify` triggers).
   *
   * The Triggers component automatically renders this list visually.
   */
  public notifications: string[];

  /**
   * Creates a new Triggers component.
   * @param element The HTMLElement on which to instantiate the component.
   * @param options The options for the Triggers component.
   * @param bindings The bindings that the component requires to function normally. If not set, these will be
   * automatically resolved (with a slower execution time).
   * @param _window The window on which to execute the triggers.
   */
  constructor(public element: HTMLElement, public options?: ITriggersOptions, public bindings?: IComponentBindings, public _window?: Window) {

    super(element, Triggers.ID, bindings);

    this._window = this._window || window;
    this.options = ComponentOptions.initComponentOptions(element, Triggers, options);
    Assert.exists(element);
    Assert.exists(this.options);

    this.notifications = [];

    this.bind.onRootElement(QueryEvents.querySuccess, this.handleProcessNewQueryResults);
  }

  private handleProcessNewQueryResults(data: IQuerySuccessEventArgs) {
    Assert.exists(data);
    Assert.exists(data.results);

    $$(this.element).empty();
    this.notifications.length = 0;
    let showElement = false;

    if (data.results.triggers === undefined) {
      $$(this.element).toggleClass('coveo-visible', showElement);
      return;
    }

    this.executeTriggers(data.results.triggers, 'notify', (trigger: ITriggerNotify) => {

      this.usageAnalytics.logCustomEvent<IAnalyticsTriggerNotify>(analyticsActionCauseList.triggerNotify, {
        notification: trigger.content
      }, this.element);

      this.notifications.push(trigger.content);
      this.element.appendChild($$('div', { className: 'coveo-trigger-notify' }, trigger.content).el);

      showElement = true;
    });

    this.executeTriggers(data.results.triggers, 'redirect', (trigger: ITriggerRedirect) => {

      this.usageAnalytics.logCustomEvent<IAnalyticsTriggerRedirect>(analyticsActionCauseList.triggerRedirect, {
        redirectedTo: trigger.content
      }, this.element);

      this._window.location.replace(trigger.content);
    }, true);

    this.executeTriggers(data.results.triggers, 'query', (trigger: ITriggerQuery) => {
      this.queryStateModel.set(QueryStateModel.attributesEnum.q, trigger.content);
      this.queryController.executeQuery({
        beforeExecuteQuery: () => {
          this.usageAnalytics.logCustomEvent<IAnalyticsTriggerQuery>(analyticsActionCauseList.triggerQuery, {
            query: trigger.content
          }, this.element);
        }
      });
    }, true);

    this.executeTriggers(data.results.triggers, 'execute', (trigger: ITriggerExecute) => {
      try {
        let func: Function = this._window['' + trigger.content.name];
        if (typeof func === 'function') {
          let params = _.object(_.map(trigger.content.params, (value, index) => {
            return ['param' + (index + 1), value];
          }));
          params['element'] = this.element;

          this.usageAnalytics.logCustomEvent<IAnalyticsTriggerExecute>(analyticsActionCauseList.triggerExecute, {
            executed: trigger.content.name
          }, this.element);

          func.apply(this._window, [params]);
        } else {
          this.logger.error(`A trigger tried to call the function '${trigger.content.name}', which doesn't exist.`, this, data.query, trigger);
        }
      } catch (error) {
        this.logger.error(`A trigger called the function '${trigger.content.name}', which threw an error.`, this, data.query, trigger);
      }
    });

    $$(this.element).toggleClass('coveo-visible', showElement);

  }

  private executeTriggers(trigger: ITrigger<any>[], type: string, func: (trigger: ITrigger<any>) => any, single: boolean = false) {
    let triggersOfType = _.filter(trigger, (trigger: ITrigger<any>) => {
      return trigger.type == type;
    });
    let oneOrAllTriggers = _.take(triggersOfType, single ? 1 : Number.MAX_VALUE);

    _.each(oneOrAllTriggers, func);
  }
}

Initialization.registerAutoCreateComponent(Triggers);
