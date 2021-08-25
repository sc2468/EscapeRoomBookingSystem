export const deleteBookingEntityCache = (cache) => {
  // Loop through all the data in our cache
  // And delete any items that start with "ListItem"
  // This empties the cache of all of our list items and 
  // forces a refetch of the data.
  console.log(cache)
  Object.keys(cache.data.data).forEach(key => {
    //console.log(key)
    //console.log(key.match(/^BookingsEntity/))
    key.match(/^BookingsEntity/) && cache.data.delete(key)
  }
  )
}