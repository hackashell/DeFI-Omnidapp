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

// we had other invariants in mind listed below but couldn't add them due to lack of time and learning curve that it required for the hack

// * A user's balances should only move with their permission
//    - they are `msg.sender`
//    - they've set approval for `msg.sender`
//    - they are a contract that was the target of a ComputeInput/Output, and they did not revert the transaction
// * Fees should be credited to the Ocean owner's ERC-1155 balance
// * Calls to the Ocean cannot cause the Ocean to make external transfers unless a
// `doInteraction`/`doMultipleInteractions` function is called and a `wrap` or `unwrap` interaction is provided.
// * The way the Ocean calculates wrapped token IDs is correct
// * Calls to the Ocean cannot cause it to mint a token without first calling the contract used to calculate its token ID.
// * The Ocean should conform to all standards that its code claims to (ERC-1155, ERC-165)
//    - EXCEPTION: The Ocean omits the safeTransfer callback during the mint that occurs after a ComputeInput/ComputeOutput.  The contract receiving the transfer was called just before the mint, and should revert the transaction if it does not want to receive the token.
// * The Ocean does not support rebasing tokens, fee on transfer tokens
// * The Ocean ERC-1155 transfer functions are secure and protected with reentrancy checks
// * During any do* call, the Ocean accurately tracks balances of the tokens involved throughout the transaction.
// * The Ocean does not provide any guarantees against the underlying token blacklisting the Ocean or any sort of other non-standard behavior
// * the user's underlying balance and the ocean token mints/burns should be in same proportion for wraps/unwraps