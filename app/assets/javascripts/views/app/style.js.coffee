class App.Views.Style extends Backbone.View
  tagName: 'style'

  attributes:
    media:  'screen'
    type:   'text/css'
    scoped: true

  initialize: ->
    @changed = true
    @styles  = {}

  render: ->
    if @changed
      @$el.html @stringified_styles()
      @changed = false
    this

  css: (selector, properties) ->
    @changed = true
    unless properties
      for sel, props of selector
        @css(sel, props)
      return

    cleaned_properties = @clean_properties(properties)

    el = @styles[selector] or= {}
    @styles[selector] = _.defaults cleaned_properties, el

  stringified_styles: ->
    sels = for selector, properties of @styles
      "#{selector} {#{@stringified_properties(properties)}}"
    sels.join("\n")

  stringified_properties: (properties) ->
    props = for property, value of properties
      "#{property}: #{value};"

    props.join(' ')

  clean_properties: (properties) ->
    cleaned_properties = {}

    for property, value of properties
      p = property.replace /[A-Z]/, (c) ->
        "-#{c.toLowerCase()}"

      cleaned_properties[p] = value

    cleaned_properties