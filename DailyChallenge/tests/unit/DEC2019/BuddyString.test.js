let { BuddyString } = require("../../../DEC2019/BuddyString");
let { BNode } = require("../../../DEC2019/DeepestNodeBTree");
let { DeepestNode } = require("../../../DEC2019/DeepestNodeBTree");
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

  it("Deepest Node BTree", () => {
    let r = new BNode("a");
    r.left = new BNode("b");
    r.left.left = new BNode("d");
    r.right = new BNode("c");

    let solu = new DeepestNode();
    let res = solu.findDeepest(r);
    expect(res).toEqual([r.left.left.toString(), 3]);
  });
});
