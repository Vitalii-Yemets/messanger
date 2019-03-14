import { from as ObservableFrom } from 'rxjs'
import * as Ontology from 'ontology-dapi'

export const getAccountAsync = () => ObservableFrom(Ontology.client.api.asset.getAccount({}))