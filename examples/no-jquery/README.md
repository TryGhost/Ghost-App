# No jQuery

No jQuery is a simple example app showing how to filter jQuery from the `ghost_foot` helper.

It uses the filter shorthand syntax to register a filter and a function to execute against that filter. It doesn't care
about priority, instead it loops through the array it is provided, and removes any item which looks like
`jquery.js`.

Alternatively it could be given a priority of 9 to ensure it is the first function which is run and then do
`return ghost_foot.slice(1);`

However this is less reliable, and it is always considered better to write filter handlers which will work independent
of priority where ever possible.