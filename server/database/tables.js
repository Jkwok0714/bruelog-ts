const TABLES = {
  recipes: ['userid', 'ingredients'],
  brewsteps: ['brewid', 'type', 'amount', 'gravity', 'temperature', 'time'],
  brew: ['userid', 'name', 'style', 'image', 'description', 'brewdate', 'bottledate',
    'mash', 'boil', 'fermentation', 'lageringtemp', 'length', 'bottling', 'tastingnote', 'archived',
    'recipeid', 'attachments', 'notes', 'seriesid', 'token', 'public'],
  series: ['userid', 'name', 'image', 'description']
};

const ID_TO_USE = {
  recipes: 'userid',
  brewsteps: 'brewid',
  brew: 'userid',
  series: 'userid'
};

module.exports = {
  TABLES,
  ID_TO_USE
}
