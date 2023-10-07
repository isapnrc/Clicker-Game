let gold = 0;
let goldPerSecond = 0;
let goldMineCost = 5000;
let hasGoldMine = false;
let goldMineUpgradeCost = 50000;
let goldMineUpgradeLevel = 0;
let apprenticeCost = 100000;
let apprenticeCount = 0;
let smithingValue = 1;
let smithingUpgradeCost = 10;
let isGoldMineActive = false;

const goldElement = document.getElementById("gold");
const goldMineButton = document.getElementById("goldMine");
const buyGoldMineButton = document.getElementById("buyGoldMine");
const upgradeGoldMineButton = document.getElementById("upgradeGoldMine");
const buyApprenticeButton = document.getElementById("buyApprentice");
const smithingButton = document.getElementById("smithing");
const smithingValueElement = document.getElementById("smithingValue");
const upgradeSmithingButton = document.getElementById("upgradeSmithing");

function updateGold() {
    goldElement.textContent = `Gold: ${gold}`;
}

function updateGoldMineButton() {
    upgradeGoldMineButton.textContent = `Upgrade Gold Mine (Cost: ${goldMineUpgradeCost} Gold, Level: ${goldMineUpgradeLevel})`;
}

function updateApprenticeButton() {
    buyApprenticeButton.textContent = `Buy Apprentice (Cost: ${apprenticeCost} Gold, Count: ${apprenticeCount}/10)`;
}

function updateSmithingUpgradeButton() {
    upgradeSmithingButton.textContent = `Upgrade Smithing (Cost ${smithingUpgradeCost} Gold, Level: ${smithingValue})`;
}


function startGoldMineEffect() {
    if (!isGoldMineActive) {
        isGoldMineActive = true;
        goldPerSecond *= 10;
        setTimeout(() => {
            isGoldMineActive = false;
            goldPerSecond /= 10;
        }, 60000);
    }
}

function handleGoldMineClick() {
    if (hasGoldMine) {
        gold += goldPerSecond * 60;
        updateGold();
    }
}

function handleBuyGoldMineClick() {
    if (gold >= goldMineCost && !hasGoldMine) {
        gold -= goldMineCost;
        hasGoldMine = true;
        goldMineButton.removeAttribute("disabled");
        buyGoldMineButton.style.display = "none";
        startGoldMineEffect();
    }
}

function handleUpgradeGoldMineClick() {
    if (gold >= goldMineUpgradeCost && hasGoldMine) {
        gold -= goldMineUpgradeCost;
        goldMineUpgradeLevel++;
        goldPerSecond += 10;
        goldMineUpgradeCost = Math.round(goldMineUpgradeCost * 1.35);
        updateGoldMineButton();
    }
}

function handleBuyApprenticeClick() {
    if (gold >= apprenticeCost && apprenticeCount < 10) {
        gold -= apprenticeCost;
        apprenticeCount++;
        goldPerSecond += 100;
        apprenticeCost = Math.round(apprenticeCost * 1.35);
        updateApprenticeButton();
    }
}

function handleSmithingClick() {
    gold += smithingValue;
    updateGold();
}

function handleUpgradeSmithingClick() {
    if (gold >= smithingUpgradeCost) {
        gold -= smithingUpgradeCost;
        smithingValue++;
        smithingUpgradeCost = Math.round(smithingUpgradeCost * 1.3);
        updateSmithingUpgradeButton();
    }
}

function autoCollect() {
    gold += goldPerSecond;
    updateGold();
}

goldMineButton.addEventListener("click", handleGoldMineClick);
buyGoldMineButton.addEventListener("click", handleBuyGoldMineClick);
upgradeGoldMineButton.addEventListener("click", handleUpgradeGoldMineClick);
buyApprenticeButton.addEventListener("click", handleBuyApprenticeClick);
smithingButton.addEventListener("click", handleSmithingClick);
upgradeSmithingButton.addEventListener("click", handleUpgradeSmithingClick);

setInterval(autoCollect, 1000);
updateGold();
updateGoldMineButton();
updateApprenticeButton();
updateSmithingUpgradeButton();
