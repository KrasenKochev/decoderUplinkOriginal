const { decodeUplink, hexToDecArr } = require('./decoder');

const basicPayload = "011C034A241805D9E7195201";
const deviceVersionBasicPayLoad = "041312011C034A241805D9E7195201";
const allProperiesBasicPayLoad = "041111121119111b111d11111f11112111111123112511115a115c115d115f1160111161111111621111116311111170111171111172117311b111a011111111011C034A241805D9E7195201";
const oddLenghtBasicPayload = "";
const invalidCharBasicPayload = "";




test('should correctly decode uplink with first payload', () => {
    const inputOne = { bytes: hexToDecArr("011C034A241805D9E7195201") };
    const expectedOutput = {
        data: {
            internalTemperature: 28,
            energy_kWh: 55190.552,
            power_W: 1497,
            acVoltage_V: 231,
            acCurrent_mA: 6482,
            relayState: 'ON',
        },
    };
    const result = decodeUplink(inputOne);

    try {
        expect(result).toEqual(expectedOutput);
    } catch (error) {
        console.error(`Test failed for input: ${inputOne.bytes}`);
        console.error(`Expected:`, expectedOutput);
        console.error(`Actual:`, result);
        throw error;
    }
});

test('should correctly decode uplink with second payload', () => {
    const inputTwo = { bytes: hexToDecArr("041312011C034A241805D9E7195201") };
    const expectedOutput = {
        data: {
            deviceVersions: { hardware: 13, software: 12 },
            internalTemperature: 28,
            energy_kWh: 55190.552,
            power_W: 1497,
            acVoltage_V: 231,
            acCurrent_mA: 6482,
            relayState: 'ON',
        },
    };
    const result = decodeUplink(inputTwo);

    try {
        expect(result).toEqual(expectedOutput);
    } catch (error) {
        console.error(`Test failed for input: ${inputTwo.bytes}`);
        console.error(`Expected:`, expectedOutput);
        console.error(`Actual:`, result);
        throw error;
    }
});
test(`should correctly decode uplink with a zero payload`,() =>{
    const inputZero = {bytes: hexToDecArr("0") };
    const expectedOutput = {
        data: {
            internalTemperature: undefined,
            energy_kWh: 0,
            power_W: 0,
            acVoltage_V: undefined,
            acCurrent_mA: 0,
            relayState: 'OFF',
        },
    };
    const result = decodeUplink(inputZero);

    try {
        expect(result).toEqual(expectedOutput);
    } catch (error) {
        console.error(`Test failed for input: ${inputZero.bytes}`);
        console.error(`Expected:`, expectedOutput);
        console.error(`Actual:`, result);
        throw error;
    }
})

// with invalid payload - G1H2

