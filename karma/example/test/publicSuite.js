describe('A suite of public functions', function () {
    it('reverse word', function () {
        expect(reverse('ABCD')).toEqual('DCBA');
    });

    it('integralization', function () {
        expect(integralization(1.68)).toEqual(1);
    });
});
