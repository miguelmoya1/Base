export const GeometryService = jest.fn().mockReturnValue({
  getDistance: jest.fn().mockResolvedValue({
    fn: 'ST_Distance',
    args: [{ col: 'location' }, { val: "ST_GeomFromText('POINT(1 2)')" }],
  }),
});
