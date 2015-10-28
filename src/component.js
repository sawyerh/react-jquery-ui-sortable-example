var SortableList = React.createClass({
  getInitialState() {
    return {
      items: [{
        id: 'a',
        position: 0,
        content: 'Adam'
      }, {
        id: 'b',
        position: 1,
        content: 'Betty'
      }, {
        id: 'c',
        position: 2,
        content: 'Charlie'
      }]
    };
  },

  componentDidMount() {
    $(ReactDOM.findDOMNode(this)).sortable({
      items: 'li',
      update: this.handleSortableUpdate
    });
  },

  handleSortableUpdate() {
    var newItems = _.clone(this.state.items, true);
    var $node = $(ReactDOM.findDOMNode(this));
    var ids = $node.sortable('toArray', { attribute: 'data-id' });

    ids.forEach((id, index) => {
      var field = _.findWhere(newItems, {id: id});
      field.position = index;
    });

    // Lets React reorder the DOM
    $node.sortable('cancel');
    this.setState({ items: newItems });
  },

  sortedItems(){
    var items = _.sortBy(this.state.items, 'position');

    return items.map((item) => {
      return (
        <li key={item.id} data-id={item.id}>
          <strong>{item.content}</strong>
          <br/>
          id: {item.id} &bull; position: {item.position}
        </li>
      )
    })
  },

  render() {
    return <ul>{this.sortedItems()}</ul>;
  }
});

ReactDOM.render(<SortableList />, document.querySelector('#list'));