//TODO : move converters such as this to a global resource file

export class MapToIterableValueConverter {
  toView(playersMap) {
    return Object.values(playersMap);
  }
}
