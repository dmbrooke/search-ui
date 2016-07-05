/// <reference path="HierarchicalFacet.ts" />

import {FacetSearch} from '../Facet/FacetSearch';
import {HierarchicalFacet} from './HierarchicalFacet';
import {IFacetSearchValuesListKlass} from '../Facet/FacetSearchValuesList'
import {FacetSearchParameters} from '../Facet/FacetSearchParameters';
import {IIndexFieldValue} from '../../rest/FieldValue';
import {FacetValue} from '../Facet/FacetValues';
import {IValueHierarchy} from './HierarchicalFacet';
import {Utils} from '../../utils/Utils';

export class HierarchicalFacetSearch extends FacetSearch {
  constructor(public facet: HierarchicalFacet, public facetSearchValuesListKlass: IFacetSearchValuesListKlass) {
    super(facet, facetSearchValuesListKlass)
  }

  protected buildParamsForExcludingCurrentlyDisplayedValues() {
    var params = super.buildParamsForExcludingCurrentlyDisplayedValues();
    params.alwaysExclude = this.facet.getDisplayedValues();
    if (this.facet.facetSearch.currentlyDisplayedResults) {
      params.alwaysExclude = params.alwaysExclude.concat(this.facet.facetSearch.currentlyDisplayedResults);
    }
    return params;
  }

  protected selectAllValuesMatchingSearch() {
      this.facet.showWaitingAnimation();

      var searchParameters = new FacetSearchParameters(this.facet);
      searchParameters.nbResults = 1000;
      searchParameters.setValueToSearch(this.getValueInInputForFacetSearch())
      this.facet.facetQueryController.search(searchParameters).then((fieldValues: IIndexFieldValue[]) => {
        this.completelyDismissSearch();
        Coveo.ModalBox.close(true);
        var facetValues = this.getFacetValues(fieldValues);
        this.facet.processFacetSearchAllResultsSelected(facetValues);
      });
      this.completelyDismissSearch();
    }

    private getFacetValues(fieldValues: IIndexFieldValue[]): FacetValue[]{
      var values = [];
      _.each(fieldValues, (fieldValue) => {
        var hierarchy = this.facet.getValueFromHierarchy(fieldValue.value);
        values.push(this.createFacetValuesFromHierarchy(hierarchy));
      })
      return _.flatten(values);
    }

    private createFacetValuesFromHierarchy(hierarchy: IValueHierarchy): FacetValue[]{
      var values = [];
      var fieldValue = hierarchy.facetValue.value;
      var facetValue = this.facet.values.get(fieldValue);
      if (!Utils.exists(facetValue)) {
        facetValue = FacetValue.create(fieldValue);
      }
      facetValue.selected = true;
      facetValue.excluded = false;
      values.push(facetValue);
      var childs = hierarchy.childs;
      _.each(childs, (child)=>{
        var childHierarchy = this.facet.getValueFromHierarchy(child.facetValue.value);
        values.push(this.createFacetValuesFromHierarchy(childHierarchy));
      })
      return values;
    }
}
