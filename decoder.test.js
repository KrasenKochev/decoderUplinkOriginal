const { decodeUplink, hexToDecArr } = require('./decoder');

test('should correctly decode uplink with firstPayload', () => {
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

test('should correctly decode uplink with secondPayload', () => {
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
