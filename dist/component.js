'use strict';

var SortableList = React.createClass({
  displayName: 'SortableList',

  getInitialState: function getInitialState() {
    return {
      items: [{
        id: 301,
        position: 0,
        content: 'Abc'
      }, {
        id: 302,
        position: 1,
        content: 'Def'
      }, {
        id: 303,
        position: 2,
        content: 'Ghi'
      }]
    };
  },

  componentDidMount: function componentDidMount() {
    $(ReactDOM.findDOMNode(this)).sortable({
      items: 'li',
      update: this.handleSortableUpdate
    });
  },

  handleSortableUpdate: function handleSortableUpdate() {
    var newItems = _.clone(this.state.items, true);
    var $node = $(ReactDOM.findDOMNode(this));
    var ids = $node.sortable('toArray', { attribute: 'data-id' });

    ids.forEach(function (id, index) {
      var field = _.findWhere(newItems, { id: parseInt(id) });
      field.position = index;
    });

    // Lets React reorder the DOM
    $node.sortable('cancel');
    this.setState({ items: newItems });
  },

  sortedItems: function sortedItems() {
    var items = _.sortBy(this.state.items, 'position');

    return items.map(function (item) {
      return React.createElement(
        'li',
        { key: item.id, 'data-id': item.id },
        item.content
      );
    });
  },

  render: function render() {
    return React.createElement(
      'ul',
      null,
      this.sortedItems()
    );
  }
});

ReactDOM.render(React.createElement(SortableList, null), document.querySelector('#list'));
