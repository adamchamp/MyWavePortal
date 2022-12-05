const main = async () => {
    var WavesPerPerson = new Map();

    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    await waveContract.getTotalWaves();

    const firstwaveTxn = await waveContract.wave();
    await firstwaveTxn.wait();

    await waveContract.getTotalWaves();

    if (WavesPerPerson.has("%s", owner.address)) {
        WavesPerPerson.set(owner.address, WavesPerPerson.get(owner.address) + 1)
    } else {
        WavesPerPerson.set(owner.address, 1)
    }

    const secondWaveTxn = await waveContract.connect(randomPerson).wave();
    await secondWaveTxn.wait();

    await waveContract.getTotalWaves();
    console.log([WavesPerPerson.entries()]);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};


runMain();