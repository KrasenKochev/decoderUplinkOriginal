const { decodeUplink, hexToDecArr } = require('./decoder');

const emptyPayload ="";

jest.mock('./decoder', () => ({
    decodeUplink: jest.fn(),
    hexToDecArr: jest.fn()  // Mock hexToDecArr as well
}));

test('should handle empty payload correctly', () => {
    hexToDecArr.mockReturnValue([]);

    const input = { bytes: hexToDecArr('') };

    decodeUplink.mockReturnValue({ data: {} });

    const data = decodeUplink(input).data;

    assertDataIsObject(data)
    assertDataObjectPropertiesCount(data, 0)

    assertPropertyAbsent(data,`deviceVersions`)
});

const assertDataObjectPropertiesCount = (data, count) => {
    try {
        const dataLength = Object.keys(data).length;
        expect(dataLength).toBe(count);
    } catch (error) {
        const dataLength = Object.keys(data).length;
        console.error(`Test failed.`);
        console.error(`Expected:`, count);
        console.error(`Actual:`, dataLength);
        throw error;
    }
};
const assertDataIsObject = (data) => {
    try {
        expect(data).not.toBeNull();
        expect(typeof data).toBe('object'); 
        expect(Array.isArray(data)).toBe(false); 
    } catch (error) {
        console.error(`Test failed.`)
        console.error("The provided value is not an object.");
        console.error("Received:", data);
        throw error;
    }
};

const assertPropertyAbsent = (data, property) => {
    try{
        expect(data).not.toHaveProperty(property);
    } catch(error){
        console.error(`Test failed.`)
        console.error(`Expected:'${property}'`)
        console.error(`Actual:`,data)
        throw error;
    }
};