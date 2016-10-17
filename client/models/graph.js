import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {GraphQuery} from '../modules/graphQuery';
import {Commands} from '../modules/commands';

@inject(GraphQuery,EventAggregator)
export class Graph {

  constructor(graphQuery,eventAggregator) {
    this._query = graphQuery;
    this._ea = eventAggregator;
    this.isInitialized = false;
    this._ea.subscribe('nodeAdded',e => this.handleNodeAdded(e));
    this._ea.subscribe('nodeRemoved',e => this.handleNodeRemoved(e));
  }

  async initialize() {

    var nodesQuery = "MATCH (a) RETURN {id: ID(a),label: a.name} LIMIT 100";
    var edgesQuery = "MATCH (a)-[r]->(b) RETURN {from: ID(a),to: ID(b),label: type(r) }";
    this.nodes = await this._query.executeOnGraph(Commands.getGraphNodes(),nodesQuery); //TODO: use batch query here
    this.edges = await this._query.executeOnGraph(Commands.getGraphEdges(),edgesQuery);
    this.isInitialized = true;
  }

  handleNodeAdded(node) {
    this.nodes.data.push({id: node._id, label: node.name});
  }

  handleNodeRemoved(nodeId) {
    var index = this.nodes.data.map(e => e.id).indexOf(nodeId);
    ~index && this.nodes.data.splice(index,1);
  }

  async getGraph() {
    if (!this.isInitialized)
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
