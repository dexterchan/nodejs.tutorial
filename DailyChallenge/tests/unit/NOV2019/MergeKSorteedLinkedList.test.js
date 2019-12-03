let {
  Node,
  mergekLinkedList
} = require("../../../NOV2019/MergeKSorteedLinkedList");

describe("NOV2019 test", () => {
  it("Test Linked List only", () => {
    a = new Node(1, new Node(3, new Node(5)));
    b = new Node(2, new Node(4, new Node(6)));
    let stra = a.toString();
    expect(stra).toEqual("135");
  });

  it("Merge K sorted list", () => {
    a = new Node(1, new Node(3, new Node(5)));
    b = new Node(2, new Node(4, new Node(6)));
    let res = mergekLinkedList([a, b]);
    expect(res.toString()).toEqual("123456");
  });
});
