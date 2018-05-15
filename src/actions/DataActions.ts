// Actions
class DataActions {
  public static applyDictionaryData = (data = '') => ({
    data,
    type: 'applyDictionaryData'
  });

  public static updateDictionary = (data) => ({
    data,
    type: 'updateDictionary'
  });

  public static applyRecipesData = (data) => ({
    data,
    type: 'applyRecipeData'
  });
}

export default DataActions;
