import {inject} from 'aurelia-framework';
import {GraphQuery} from '../modules/graphQuery';
import {Commands} from '../modules/commands';

@inject(GraphQuery)
export class Graph {

  constructor(graphQuery) {
    this._query = graphQuery;
    this._isInitialized = false;
    this._graph = {};
  }

  async initialize() {
    var nodesQuery = "MATCH (a) RETURN {id: ID(a),label: a.name} LIMIT 100";
    var edgesQuery = "MATCH (a)-[*]->(b) RETURN {from: ID(a),to: ID(b)}";
    let nodes = await this._query.executeOnGraph(Commands.getGraphNodes(),nodesQuery);
    let edges = await this._query.executeOnGraph(Commands.getGraphEdges(),edgesQuery);
    this._graph = {nodes: nodes.data,edges: edges.data };
    this._isInitialized = true;
  }

  async getGraph() {
    if (!this._isInitialized)
      await this.initialize();
    return this._graph;
  }

  async getNodes() {
    if(!this._isInitialized)
      await this.initialize();
    return this._graph.nodes;
  }

  async getEdges() {
    if(!this._isInitialized)
      await this.initialize();
    return this._graph.edges;
  }

}
