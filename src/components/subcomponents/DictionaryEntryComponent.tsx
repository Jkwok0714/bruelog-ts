import * as React from 'react';

interface IDictionaryEntryComponentProps {
  item: object;
}

class DictionaryEntryComponent extends React.Component<IDictionaryEntryComponentProps, {}> {

  public render () {
    return <div>Hop Dictionary</div>;
  }
}

export default DictionaryEntryComponent as React.ComponentClass<IDictionaryEntryComponentProps>;
