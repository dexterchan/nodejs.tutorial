let { BuddyString } = require("../../../DEC2019/BuddyString");

describe("DECC2019 test", () => {
  it("Buddy String", () => {
    let res;

    const buddyString = new BuddyString();
    res = buddyString.buddyStrings("aaaaaaabc", "aaaaaaacb");
    expect(res).toEqual(true);
    expect(res).toBeTruthy();

    res = buddyString.buddyStrings("aaaaaaabc", "aaaaaakcb");
    expect(res).toBeFalsy();
  });
});
