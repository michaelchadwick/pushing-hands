#= require underscore
#= require backbone

class window.Cell extends Backbone.Model
  @COLORS = ["r", "g", "b", "o"]

  initialize: ->
    unless @get("color")
      index = Math.floor(Math.random() * @constructor.COLORS.length)
      @set("color", @constructor.COLORS[index])

class CellRow extends Backbone.Collection
  model: Cell

class CellRowsView extends Backbone.View
  initialize: ->
    @rows = @options.rows
    @setElement($("#grid"))

  render: ->
    _.each @rows, (row) =>
      view = new CellRowView(collection: row)
      @$el.append(view.render().el)
    this

class CellRowView extends Backbone.View
  tagName: "tr"

  initialize: ->
    @collection.on("push", @push, this)

  render: ->
    @collection.each (cell) =>
      view = new CellView(model: cell)
      @$el.append(view.render().el)
    this

  push: (flip) ->
    models = @collection.models
    if flip
      models = Array::reverse.call(models.slice())
    nextColor = models[models.length - 1].get("color")
    _.each models, (cell) =>
      newColor = nextColor
      nextColor = cell.get("color")
      cell.set("color", newColor)


class CellView extends Backbone.View
  tagName: "td"

  initialize: ->
    @model.on("change", @render, this)

  render: ->
    @$el.removeClass().addClass(@model.get("color"))
    this

class HandsView extends Backbone.View
  events:
    "click": "clickedHand"

  initialize: ->
    @setElement(@options.id)
    @grid = @options.grid
    @flip = !!@options.flip

  clickedHand: (event) =>
    index = $(event.target).index()
    @grid.rows[index].trigger("push", @flip)

class Application
  constructor: (rowCount, columnCount) ->
    rows = for i in [0...rowCount]
      collection = for j in [0...columnCount]
        new Cell
      new CellRow(collection)

    @grid = new CellRowsView(rows: rows)
    @grid.render()

    @handsLeft = new HandsView(id: "#hands-left", grid: @grid)
    @handsRight = new HandsView(id: "#hands-right", grid: @grid, flip: true)

$ ->
  window.ph = new Application(10, 10)