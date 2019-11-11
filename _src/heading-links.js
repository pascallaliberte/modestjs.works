const AnchorJS = require('anchor-js')

const anchors = new AnchorJS()

anchors.options.placement = 'right'
anchors.options.visible = 'always'
anchors.add('.book-content h2, .book-content h3')
