webpackJsonpCoveo__temporary([18],{14:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(0),n=function(){function e(){}return e.addClassToSVGInContainer=function(t,i){var o=t.querySelector("svg");o.setAttribute("class",""+e.getClass(o)+i)},e.removeClassFromSVGInContainer=function(t,i){var o=t.querySelector("svg");o.setAttribute("class",e.getClass(o).replace(i,""))},e.addStyleToSVGInContainer=function(e,t){var i=e.querySelector("svg");o.each(t,function(e,t){i.style[t]=e})},e.getClass=function(e){var t=e.getAttribute("class");return t?t+" ":""},e}();t.SVGDom=n},211:function(e,t,i){"use strict";var o=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])};return function(t,i){function o(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}();Object.defineProperty(t,"__esModule",{value:!0});var n=i(6),s=i(1),r=i(3);i(328);var l=i(2),a=i(10),c=i(7),u=i(8),p=i(5),h=i(0),d=i(56),f=i(38),m=i(13),v=i(14),g=i(436),y=i(44),b=i(20),C=i(9),S=function(e){function t(i,o,n){var s=e.call(this,i,t.ID,n)||this;return s.element=i,s.options=o,s.bindings=n,s.previouslySelected=[],s.groupByRequestValues=[],s.isSticky=!1,s.options=c.ComponentOptions.initComponentOptions(i,t,o),s.element.title=s.options.title,s.buildContent(),l.$$(s.element).on("click",function(e){return s.handleClick(e)}),l.$$(s.element).setAttribute("tabindex","0"),s.bindKeyboardEvents(),s.bind.onRootElement(f.BreadcrumbEvents.populateBreadcrumb,function(e){return s.handlePopulateBreadcrumb(e)}),s.bind.onRootElement(f.BreadcrumbEvents.clearBreadcrumb,function(){return s.handleClearBreadcrumb()}),s.bind.onRootElement(a.QueryEvents.buildingQuery,function(e){return s.handleBuildingQuery(e)}),s.bind.onRootElement(a.QueryEvents.doneBuildingQuery,function(e){return s.handleDoneBuildingQuery(e)}),s.bind.onRootElement(a.QueryEvents.querySuccess,function(e){return s.handleQuerySuccess(e)}),s}return o(t,e),t.prototype.getValueContainer=function(){return this.valueContainer},t.prototype.getValueCaption=function(e){var t=e;return h.contains(h.keys(this.options.valueCaption),e)?(t=this.options.valueCaption[t]||t,u.l(t)):y.FacetUtils.tryToGetTranslatedCaption(this.options.field.toString(),t)},t.prototype.getSelectedCaptions=function(){var e=this;return h.map(this.getSelectedValues(),function(t){return e.getValueCaption(t)})},t.prototype.toggleContainer=function(){l.$$(this.valueContainer).hasClass("coveo-simplefilter-value-container-expanded")?this.closeContainer():this.openContainer()},t.prototype.selectValue=function(e,t){var i=this;void 0===t&&(t=!0),h.each(this.checkboxes,function(o){var n=i.getValueCaption(o.label);o.label!=e&&n!=e||o.checkbox.select(t)})},t.prototype.deselectValue=function(e){var t=this;h.each(this.checkboxes,function(i){var o=t.getValueCaption(i.label);i.label!=e&&o!=e||i.checkbox.reset()})},t.prototype.toggleValue=function(e){var t=this;h.each(this.checkboxes,function(i){var o=t.getValueCaption(i.label);i.label!=e&&o!=e||i.checkbox.toggle()})},t.prototype.resetSimpleFilter=function(){var e=this;h.each(this.checkboxes,function(t){t.checkbox.isSelected()&&e.deselectValue(t.label)})},t.prototype.openContainer=function(){l.$$(this.element).addClass("coveo-simplefilter-value-container-expanded"),this.valueContainer.addClass("coveo-simplefilter-value-container-expanded"),this.refreshValueContainer(),this.isSticky=!0,this.backdrop.hasClass("coveo-dropdown-background-active")||this.showBackdrop()},t.prototype.closeContainer=function(){l.$$(this.element).removeClass("coveo-simplefilter-value-container-expanded"),this.valueContainer.removeClass("coveo-simplefilter-value-container-expanded"),this.backdrop.hasClass("coveo-dropdown-background-active")&&this.hideBackdrop(),0==this.getSelectedLabeledCheckboxes().length&&(this.isSticky=!1)},t.prototype.getSelectedValues=function(){return h.map(this.getSelectedLabeledCheckboxes(),function(e){return e.label})},t.prototype.bindKeyboardEvents=function(){var e=this;l.$$(this.element).on("keyup",b.KeyboardUtils.keypressAction(b.KEYBOARD.ENTER,function(t){t.target==e.element?e.toggleContainer():e.toggleValue(l.$$(t.target).text())})),l.$$(this.element).on("blur",function(i){var o=i.relatedTarget;l.$$(o).parent(n.Component.computeCssClassName(t))||e.closeContainer()})},t.prototype.handleClick=function(e){e.stopPropagation(),e.target==this.element&&this.toggleContainer()},t.prototype.handleValueToggle=function(e){var t=this.getSelectedValues();this.circleElement.text(t.length.toString()),this.circleElement.removeClass("coveo-simplefilter-circle-hidden"),1==t.length?(this.setDisplayedTitle(this.getValueCaption(t[0])),this.element.title=this.getValueCaption(t[0])):(this.setDisplayedTitle(this.options.title),this.element.title=this.options.title,t.length<1&&this.circleElement.addClass("coveo-simplefilter-circle-hidden"));var i=e.isSelected()?C.analyticsActionCauseList.simpleFilterSelectValue:C.analyticsActionCauseList.simpleFilterDeselectValue;this.usageAnalytics.logSearchEvent(i,{simpleFilterTitle:this.options.title,simpleFilterSelectedValue:e.label,simpleFilterField:this.options.field}),this.queryController.executeQuery()},t.prototype.createCheckbox=function(e){var t=this,i=new d.Checkbox(function(){t.handleValueToggle(i)},this.getValueCaption(e));return i.getElement().title=u.l(e),l.$$(i.getElement()).setAttribute("tabindex","0"),{checkbox:i,label:e}},t.prototype.createCheckboxes=function(){var e=this;this.previouslySelected.length>0?(this.checkboxes=h.map(this.previouslySelected,function(t){return e.createCheckbox(t)}),h.each(this.checkboxes,function(t){e.previouslySelected.indexOf(t.label)>=0&&e.selectValue(t.label,!1)})):void 0!=this.options.values?this.checkboxes=h.map(this.options.values,function(t){return e.createCheckbox(t)}):void 0!=this.groupByRequestValues&&(this.checkboxes=h.map(this.groupByRequestValues,function(t){return e.createCheckbox(t)})),h.each(this.checkboxes,function(t){e.valueContainer.append(t.checkbox.getElement())}),this.checkboxes.length>0&&l.$$(l.$$(this.checkboxes[this.checkboxes.length-1].checkbox.getElement()).find(".coveo-checkbox-button")).on("blur",function(){e.closeContainer()})},t.prototype.createValueContainer=function(){this.valueContainer=l.$$("div",{className:"coveo-simplefilter-value-container"})},t.prototype.buildContent=function(){this.createValueContainer(),this.element.appendChild(this.buildSelect()),this.element.appendChild(this.valueContainer.el),this.findOrCreateWrapper().append(this.element),this.createBackdrop()},t.prototype.buildSelect=function(){var e=l.$$("span",{className:"coveo-simplefilter-select"});return this.selectTitle=l.$$("span",{className:"coveo-simplefilter-selecttext"},this.getValueCaption(this.options.title)),e.append(this.selectTitle.el),e.append(this.buildCircleElement()),e.append(this.buildSvgToggleUpIcon()),e.el},t.prototype.buildSvgToggleUpIcon=function(){var e=l.$$("span",{className:"coveo-simplefilter-toggle-svg-container"},m.SVGIcons.icons.arrowDown).el;return v.SVGDom.addClassToSVGInContainer(e,"coveo-simplefilter-toggle-down-svg"),e},t.prototype.buildCircleElement=function(){return this.circleElement=l.$$("span",{className:"coveo-simplefilter-circle coveo-simplefilter-circle-hidden"},this.getSelectedLabeledCheckboxes().length.toString()),this.circleElement.el},t.prototype.createBackdrop=function(){var e=this,t=l.$$(this.root).find(".coveo-dropdown-background");null==t?(this.backdrop=l.$$("div",{className:"coveo-dropdown-background"}),this.root.appendChild(this.backdrop.el)):this.backdrop=l.$$(t),this.backdrop.on("click",function(){return e.closeContainer()})},t.prototype.handlePopulateBreadcrumb=function(e){var t=this;if(this.getSelectedLabeledCheckboxes().length>0){var i=l.$$("div",{className:"coveo-simplefilter-breadcrumb"}),o=l.$$("span",{className:"coveo-simplefilter-breadcrumb-title"},this.options.title);i.append(o.el);var n=l.$$("span",{className:"coveo-simplefilter-breadcrumb-values"});i.append(n.el),h.each(this.getSelectedLabeledCheckboxes(),function(e){var i=l.$$("span",{className:"coveo-simplefilter-breadcrumb-value"},t.getValueCaption(e.label));n.append(i.el);var o=l.$$("span",{className:"coveo-simplefilter-breadcrumb-clear"},m.SVGIcons.icons.checkboxHookExclusionMore);v.SVGDom.addClassToSVGInContainer(o.el,"coveo-simplefilter-breadcrumb-clear-svg"),i.append(o.el),i.el.title=t.getValueCaption(e.label),l.$$(i).on("click",function(){return t.handleRemoveFromBreadcrumb(e)})}),e.breadcrumbs.push({element:i.el})}},t.prototype.handleRemoveFromBreadcrumb=function(e){e.checkbox.reset(),this.refreshValueContainer()},t.prototype.handleClearBreadcrumb=function(){this.usageAnalytics.logSearchEvent(C.analyticsActionCauseList.simpleFilterClearAll,{simpleFilterTitle:this.options.title,simpleFilterField:this.options.field}),this.resetSimpleFilter()},t.prototype.handleQuerySuccess=function(e){e.results.results.length>0?this.findOrCreateWrapper().removeClass("coveo-no-results"):this.findOrCreateWrapper().addClass("coveo-no-results"),void 0==this.options.values&&(this.groupByBuilder.groupBy(e),this.groupByRequestValues=this.groupByBuilder.getValuesFromGroupBy(),this.refreshValueContainer(),l.$$(this.element).hasClass("coveo-simplefilter-value-container-expanded")||(this.isSticky=!1))},t.prototype.handleBuildingQuery=function(e){p.Assert.exists(e),p.Assert.exists(e.queryBuilder);var t=this.getSelectedValues();t.length>0&&e.queryBuilder.advancedExpression.addFieldExpression(this.options.field.toString(),"==",t)},t.prototype.handleDoneBuildingQuery=function(e){void 0==this.options.values&&(p.Assert.exists(e),p.Assert.exists(e.queryBuilder),this.previouslySelected=this.getSelectedValues(),this.groupByBuilder=new g.SimpleFilterValues(this,this.options),this.groupByBuilder.handleDoneBuildingQuery(e))},t.prototype.getSelectedLabeledCheckboxes=function(){return h.filter(this.checkboxes,function(e){return e.checkbox.isSelected()})},t.prototype.setDisplayedTitle=function(e){this.selectTitle.text(this.getValueCaption(e))},t.prototype.showBackdrop=function(){this.backdrop.addClass("coveo-dropdown-background-active")},t.prototype.hideBackdrop=function(){this.backdrop.removeClass("coveo-dropdown-background-active")},t.prototype.findOrCreateWrapper=function(){if(null==l.$$(this.root).find(".coveo-simplefilter-header-wrapper")){var e=l.$$("div",{className:"coveo-simplefilter-header-wrapper"});return e.insertBefore(this.element),e}var e=l.$$(this.root).find(".coveo-simplefilter-header-wrapper");return l.$$(e)},t.prototype.refreshValueContainer=function(){this.isSticky||(this.valueContainer.empty(),this.createCheckboxes()),0!=this.checkboxes.length||this.isSticky?l.$$(this.element).removeClass("coveo-simplefilter-empty"):l.$$(this.element).addClass("coveo-simplefilter-empty"),l.$$(this.circleElement).text(this.getSelectedLabeledCheckboxes().length.toString())},t.ID="SimpleFilter",t.doExport=function(){r.exportGlobally({SimpleFilter:t})},t.options={maximumNumberOfValues:c.ComponentOptions.buildNumberOption({defaultValue:5,min:0}),values:c.ComponentOptions.buildListOption(),field:c.ComponentOptions.buildFieldOption({required:!0}),title:c.ComponentOptions.buildStringOption({defaultValue:u.l("NoTitle")}),valueCaption:c.ComponentOptions.buildJsonOption()},t}(n.Component);t.SimpleFilter=S,s.Initialization.registerAutoCreateComponent(S)},328:function(e,t){},436:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),i(328);var o=i(0),n=function(){function e(e,t){this.simpleFilter=e,this.options=t,this.groupByRequestValues=[]}return e.prototype.getValuesFromGroupBy=function(){return this.groupByRequestValues},e.prototype.groupBy=function(e){var t=this;this.groupByRequestValues=[];var i=e.results.groupByResults;i.length>0&&void 0!=this.position&&o.each(i[this.position].values,function(e){t.groupByRequestValues.indexOf(e.lookupValue)<0&&t.groupByRequestValues.push(e.lookupValue)})},e.prototype.handleDoneBuildingQuery=function(e){var t=e.queryBuilder;this.putGroupByIntoQueryBuilder(t)},e.prototype.putGroupByIntoQueryBuilder=function(e){var t=this.createBasicGroupByRequest();e.groupByRequests.push(t),this.position=e.groupByRequests.length-1},e.prototype.createBasicGroupByRequest=function(){return{field:this.options.field,maximumNumberOfValues:this.options.maximumNumberOfValues,injectionDepth:1e3}},e}();t.SimpleFilterValues=n},44:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(18),n=i(19),s=i(89),r=i(29),l=i(4),a=i(2),c=i(0),u=i(8),p=function(){function e(){}return e.getRegexToUseForFacetSearch=function(e,t){return new RegExp(o.StringUtils.stringToRegex(e,t),"i")},e.getValuesToUseForSearchInFacet=function(e,t){var i=[e],o=this.getRegexToUseForFacetSearch(e,t.options.facetSearchIgnoreAccents);return t.options.valueCaption?(c.chain(t.options.valueCaption).pairs().filter(function(e){return o.test(e[1])}).each(function(e){i.push(e[0])}),(n.QueryUtils.isStratusAgnosticField(t.options.field,"@objecttype")||n.QueryUtils.isStratusAgnosticField(t.options.field,"@filetype"))&&c.each(s.FileTypes.getFileTypeCaptions(),function(e,n){n in t.options.valueCaption||!o.test(e)||i.push(n)})):n.QueryUtils.isStratusAgnosticField(t.options.field,"@objecttype")||n.QueryUtils.isStratusAgnosticField(t.options.field,"@filetype")?c.each(c.filter(c.pairs(s.FileTypes.getFileTypeCaptions()),function(e){return o.test(e[1])}),function(e){i.push(e[0])}):n.QueryUtils.isStratusAgnosticField(t.options.field,"@month")&&c.each(c.range(1,13),function(e){o.test(r.DateUtils.monthToString(e-1))&&i.push(("0"+e.toString()).substr(-2))}),i},e.buildFacetSearchPattern=function(e){return e=c.map(e,function(e){return l.Utils.escapeRegexCharacter(e)}),e[0]=".*"+e[0]+".*",e.join("|")},e.needAnotherFacetSearch=function(e,t,i,o){return e<t&&e<o&&e>i},e.addNoStateCssClassToFacetValues=function(e,t){if(0!=e.values.getSelected().length){var i=a.$$(t).findAll("li:not(.coveo-selected)");c.each(i,function(e){a.$$(e).addClass("coveo-no-state")})}},e.tryToGetTranslatedCaption=function(e,t){var i;if(n.QueryUtils.isStratusAgnosticField(e.toLowerCase(),"@filetype"))i=s.FileTypes.getFileType(t).caption;else if(n.QueryUtils.isStratusAgnosticField(e.toLowerCase(),"@objecttype"))i=s.FileTypes.getObjectType(t).caption;else if(n.QueryUtils.isStratusAgnosticField(e.toLowerCase(),"@month")&&"Search"!=t)try{var o=parseInt(t);i=r.DateUtils.monthToString(o-1)}catch(e){}else i=u.l(t);return void 0!=i&&l.Utils.isNonEmptyString(i)?i:t},e}();t.FacetUtils=p}});