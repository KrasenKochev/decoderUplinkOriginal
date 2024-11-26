const { decodeUplink, hexToDecArr } = require('./decoder');

const basicPayload = "011C034A241805D9E7195201";
const deviceVersionBasicPayLoad = "041312011C034A241805D9E7195201";
const allProperiesPayLoad = "041111121119111b111d11111f11112111111123112511115a115c115d115f1160111161111111621111116311111170111171111172117311b111a011111111011C034A241805D9E7195201";
const oddLenghtBasicPayload = "041312011C034A241805D9E7195201898";
const invalidCharBasicPayload = "JP7 =0/";
const shortPayload = "011C";
const oneValidCharPayload = "0";
const emptyPayload ="";

test('should correctly decode uplink with valid basic payload', () => {
    const input = { bytes: hexToDecArr(basicPayload) };
    const data = decodeUplink(input).data;

    assertDataIsObject(data);
    assertDataObjectPropertiesCount(data, 6)

    assertBasicPayload(input);
    assertPropertyAbsent(data,`deviceVersions`)

});
test('should be able to decode uplink with a payload containing one valid char', () => {
    const input = { bytes: hexToDecArr(oneValidCharPayload) };
    const data = decodeUplink(input).data;

    assertDataIsObject(data);
    assertDataObjectPropertiesCount(data, 6)

    assertOneValidCharPayload(input);
    assertPropertyNoValue (data,`internalTemperature`)

});
test('should correctly decode uplink with valid basic payload plus device version information', () => {
    const input = { bytes: hexToDecArr(deviceVersionBasicPayLoad) };
    const data = decodeUplink(input).data;

    assertDataIsObject(data);
    assertDataObjectPropertiesCount(data, 7)

    assertDeviceVersionPayload(input);
    assertPropertyValue(data, 'deviceVersions', {"hardware": 13, "software": 12});

});
test('should correctly decode uplink with payload containing all information for all functionalities', () => {
    const input = { bytes: hexToDecArr(allProperiesPayLoad) };
    const data = decodeUplink(input).data;

    assertDataIsObject(data);
    assertDataObjectPropertiesCount(data, 28)
    
    assertFullInformationPayload(input);

});
test('should be able to read uplink with payload containing odd number of chars in payload', () => {
    const input = { bytes: hexToDecArr(oddLenghtBasicPayload) };
    const data = decodeUplink(input).data;

    assertDataIsObject(data);
    assertDataObjectPropertiesCount(data, 7)

    assertOddLenghtCharPayload(input);

});
test('should be able ro read uplink with payload containing invalid chars in payload', () => {
    const input = { bytes: hexToDecArr(invalidCharBasicPayload) };
    const data = decodeUplink(input).data;
    
    assertDataIsObject(data);
    assertDataObjectPropertiesCount(data, 6)

    assertInvalidCharPayload(input);

});
test('should be able ro decode uplink with payload containing less than twenty four chars in payload', () => {
    const input = { bytes: hexToDecArr(shortPayload) };
    const data = decodeUplink(input).data;

    assertDataIsObject(data);
    assertDataObjectPropertiesCount(data, 6)

    assertShortPayload(input);
    assertPropertyPresent(data,`acVoltage_V`)
    assertPropertyNoValue(data, "acVoltage_V")
    assertPropertyPresent(data,`energy_kWh`)
    assertPropertyNoValue(data, "energy_kWh")

});

const assertDecodedUplink = (result, expectedOutput, input) => {
    try {
        expect(result).toEqual(expectedOutput);
    } catch (error) {
        console.error(`Test failed for input: ${input.bytes}`);
        console.error(`Expected:`, expectedOutput);
        console.error(`Actual:`, result);
        throw error;
    }
};
const assertBasicPayload = (input) => {
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
    const result = decodeUplink(input);
    assertDecodedUplink(result, expectedOutput, input);
};
const assertDeviceVersionPayload = (input) => {
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
    const result = decodeUplink(input);
    assertDecodedUplink(result, expectedOutput, input);
};
const assertOneValidCharPayload = (input) => {
    const expectedOutput = {
        data: {
            internalTemperature: undefined,
            energy_kWh: 0,
            power_W: 0,
            acVoltage_V: undefined,
            acCurrent_mA: 0,
            relayState: 'OFF'
        },
    };
    const result = decodeUplink(input);
    assertDecodedUplink(result, expectedOutput, input);
};
const assertFullInformationPayload = (input) => {
    const expectedOutput = {
        data: {
            deviceVersions: { hardware: 11, software: 11 },
            keepAliveTime: 17,
            joinRetryPeriod: 1.4166666666666667,
            uplinkType: 17,
            watchDogParams: { wdpC: 17, wdpUc: 17 },
            overheatingThresholds: { trigger: 17, recovery: 17 },
            overvoltageThreshold: { trigger: 4369, recovery: 17 },
            overcurrentThreshold: 17,
            overpowerThreshold: 4369,
            afterOverheatingProtectionRecovery: 17,
            ledIndicationMode: 17,
            manualChangeRelayState: false,
            relayRecoveryState: 17,
            overheatingEvents: { events: 17, temperature: 17 },
            overvoltageEvents: { events: 17, voltage: 4369 },
            overcurrentEvents: { events: 17, current: 4369 },
            overpowerEvents: { events: 17, power: 4369 },
            overheatingRecoveryTime: 4369,
            overvoltageRecoveryTime: 4369,
            overcurrentRecoveryTemp: 17,
            overpowerRecoveryTemp: 17,
            relayState: 'ON',
            fuota: { fuota_address: 286331153, fuota_address_raw: '11111111' },
            internalTemperature: 28,
            energy_kWh: 55190.552,
            power_W: 1497,
            acVoltage_V: 231,
            acCurrent_mA: 6482
        },
    };
    const result = decodeUplink(input);
    assertDecodedUplink(result, expectedOutput, input);
};
const assertOddLenghtCharPayload = (input) => {
    const expectedOutput = {
        data: {
            deviceVersions: { hardware: 13, software: 12 },
            internalTemperature: 74,
            energy_kWh: 605554.137,
            power_W: 59161,
            acVoltage_V: 82,
            acCurrent_mA: 393,
            relayState: 'OFF'
        },
    };
    const result = decodeUplink(input);
    assertDecodedUplink(result, expectedOutput, input);
};
const assertInvalidCharPayload = (input) => {
    const expectedOutput = {
        data: {
            internalTemperature: 7,
            energy_kWh: 0,
            power_W: 0,
            acVoltage_V: undefined,
            acCurrent_mA: 0,
            relayState: 'OFF'
        },
    };
    const result = decodeUplink(input);
    assertDecodedUplink(result, expectedOutput, input);
};
const assertShortPayload = (input) => {
    const expectedOutput = {
        data: {
            internalTemperature: 28,
            energy_kWh: 0,
            power_W: 0,
            acVoltage_V: undefined,
            acCurrent_mA: 0,
            relayState: 'OFF'
        },
    };
    const result = decodeUplink(input);
    assertDecodedUplink(result, expectedOutput, input);
};
const assertPropertyPresent = (data, property) => {
    try{
        expect(data).toHaveProperty(property);
    } catch(error){
        console.error(`Test failed.`)
        console.error(`Expected:`,property)
        console.error(`Actual:`,data)
        throw error;
    }
    
};
const assertPropertyAbsent = (data, property) => {
    try{
        expect(data).not.toHaveProperty(property);
    } catch(error){
        console.error(`Test failed.`)
        console.error(`Expected:`,property)
        console.error(`Actual:`,data)
        throw error;
    }
};
const assertPropertyValue = (data, property, value) => {
    try{
        expect(data).toHaveProperty(property, value);
    } catch(error){
        console.error(`Test failed.`)
        console.error(`Expected:`,property)
        console.error(`Actual:`,data)
        throw error;
    }
};
const assertPropertyNoValue = (data, property) => {
    try{
        expect(data[property]).toBeFalsy();
    } catch(error){
        console.error(`Test failed.`)
        console.error(`Expected:`,property)
        console.error(`Actual:`,data)
        throw error;
    }
};
const assertDataIsObject = (data) => {
    try{
        expect(typeof data).toBe('object');
        expect(data).not.toBeNull();
        expect(Array.isArray(data)).toBe(false);
    }catch(error){
        console.error("Test failed.")
        console.error(data,"Is not an object")
    }
    
};
const assertDataObjectPropertiesCount = (data, count) => {
    try{
        expect(Object.keys(data).length).toBe(count);
    }catch(error){
        console.error(`Test failed.`)
        console.error(`Expected:`,data)
        console.error(`Actual:`,count)
    }

};

