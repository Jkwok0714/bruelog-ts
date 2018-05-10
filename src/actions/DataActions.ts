// Actions
class DataActions {
  public static applyDictionaryData = (data = '') => ({
    data,
    type: 'applyDictionaryData'
  });
}

export default DataActions;
