using ERC20 as asset;

//Method block defining envfree method (and summaries)
methods {
    function uri(uint256) external returns string envfree;
    function balanceOf(address, uint256) external returns uint256 envfree;
    function balanceOfBatch(address[], uint256[]) external returns uint256[] envfree;
    function isApprovedForAll(address, address) external returns bool envfree;
}

rule wrapERC20MustResultInIncreaseInOceanTokenBalance(uint256 amount, address user){
    require(amount != 0);
    OceanHelper.Interaction interaction;
    interaction.inputToken = 0;
    interaction.outputToken = 0;
    interaction.specifiedAmount = amount;
    interaction.metadata = bytes32(0);
    interaction.interactionTypeAndAddress = fetchInteractionId(token, 0);

    uint256 userOceanTokenBalanceBefore = balanceOf(user, calculateOceanId(token, 0));
    
    doInteraction(interaction);

    uint256 userOceanTokenBalanceAfter = balanceOf(user, calculateOceanId(token, 0));

    assert userOceanTokenBalanceAfter > userOceanTokenBalanceBefore;
    assert totalAssetsAfter >= totalAssetsBefore, "User oean balance must increase"; 
}

rule unwrapERC20MustResultInDecreaseInOceanTokenBalance(uint256 amount, address user){
    require(amount != 0);
    OceanHelper.Interaction interaction;
    interaction.inputToken = 0;
    interaction.outputToken = 0;
    interaction.specifiedAmount = amount;
    interaction.metadata = bytes32(0);
    interaction.interactionTypeAndAddress = fetchInteractionId(token, 0);

    uint256 userOceanTokenBalanceBefore = balanceOf(user, calculateOceanId(token, 0));
    
    doInteraction(interaction);

    uint256 userOceanTokenBalanceAfter = balanceOf(user, calculateOceanId(token, 0));

    assert userOceanTokenBalanceAfter > userOceanTokenBalanceBefore, "User oean balance must increase"; 

    interaction.inputToken = 0;
    interaction.outputToken = 0;
    interaction.specifiedAmount = amount;
    interaction.metadata = bytes32(0);
    interaction.interactionTypeAndAddress = fetchInteractionId(token, 1);

    userOceanTokenBalanceBefore = balanceOf(user, calculateOceanId(token, 0));
    
    doInteraction(interaction);

    userOceanTokenBalanceAfter = balanceOf(user, calculateOceanId(token, 0));

    assert userOceanTokenBalanceAfter < userOceanTokenBalanceBefore, "User oean balance must decrease"; 
} 