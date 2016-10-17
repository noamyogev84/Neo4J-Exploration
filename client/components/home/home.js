import {PLATFORM} from 'aurelia-pal';
import {inject} from 'aurelia-framework';
import {Graph} from '../../models/graph';

@inject(Graph)
export class Home {

  constructor(graph) {
    this._graph = graph;
    this._nodes = {};
    this._edges = {};
  }

  async activate() {
    if(!this._graph.isInitialized)
      await this._graph.initialize();
    this._nodes = this._graph.nodes.data;
    this._edges = this._graph.edges.data;
  }

  async attached() {
    let scriptElement = document.createElement('script');
    scriptElement.src = this.renderGraph();
  }

  renderGraph() {
    var nodes = new vis.DataSet(this._nodes);
    var edges = new vis.DataSet(this._edges);

    // create a network
    var container = document.getElementById('mynetwork');
    // provide the data in the vis format
    var data = {
      nodes: nodes,
      edges: edges
    };

    var options = {
      autoResize: false,
      height: '100%',
      width: '100%',
      locale: 'en',
      nodes: {
        shape: 'circle',
        color: {
          border: '#2B7CE9',
          background: '#97C2FC',
          highlight: {
            border: '#2B7CE9',
            background: '#D2E5FF'
          },
          hover: {
            border: '#2B7CE9',
            background: '#ffff66'
          }
        },
        font: {
          color: '#343434',
          size: 14, // px
          face: 'arial',
          background: 'none',
          strokeWidth: 0, // px
          strokeColor: '#ffffff',
          align: 'center'
        }
      },
      edges: {
        color: 'red',
        shadow: true,
        smooth: true,
        arrows: 'to',
        font: {
          size: 8,
          align: 'horizontal'
        }
      },
      interaction:{
        dragNodes:true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideNodesOnDrag: false,
        hover: true,
        hoverConnectedEdges: true,
        keyboard: {
          enabled: false,
          speed: {x: 10, y: 10, zoom: 0.02},
          bindToWindow: true
        },
        multiselect: false,
        navigationButtons: false,
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 300,
        zoomView: true
      }
    };

    // initialize your network
    var network = new vis.Network(container, data, options);
  }

}
