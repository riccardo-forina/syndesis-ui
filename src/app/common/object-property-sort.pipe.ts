import { Pipe } from '@angular/core';

export class ObjectPropertySortConfig {
  sortField: string;
  descending: boolean;
}

@Pipe({
  name: 'objectPropertySort',
})
export class ObjectPropertySortPipe {
  transform(objects: any[], config: ObjectPropertySortConfig) {
    if (!config || !('sortField' in config)) {
      return objects;
    }
    // operate on a clone
    const answer = objects.slice(0).sort((a, b) => {
      const propA = a[config.sortField];
      const propB = b[config.sortField];
      switch (typeof propA) {
        case 'string':
          return (<string>propA).localeCompare(propB);
        case 'number':
          if (typeof propB === 'number') {
            return propA - propB;
          }
          // we give up here
          return 1;
        default:
          // we give up here too
          return 1;
      }
    });
    if (config.descending) {
      answer.reverse();
    }
    return answer;
  }
}
