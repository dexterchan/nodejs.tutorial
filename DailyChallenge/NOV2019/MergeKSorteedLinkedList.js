const FastPriorityQueue = require("fastpriorityqueue");

class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
  toString() {
    var c = this;
    var answer = "";
    while (c != null) {
      answer += String(c.val);
      c = c.next;
    }
    return answer;
  }
}

class Solution {
  merge_multi_linkedList(lists) {
    const h = new FastPriorityQueue((nodeA, nodeB) => {
      nodeA.val < nodeB.val;
    });
    lists.forEach((element, index) => h.add(element));
    var res = null;
    var endNode = null;
    while (h.size > 0) {
      const smallnode = h.poll();
      if (smallnode.next != null) {
        h.add(smallnode.next);
      }
      smallnode.next = null;
      if (res == null) {
        res = smallnode;
        endNode = smallnode;
      } else {
        endNode.next = smallnode;
        endNode = endNode.next;
      }
    }
    return res;
  }
}
const mergekLinkedList = lists => {
  const solu = new Solution();
  return solu.merge_multi_linkedList(lists);
};

module.exports = {
  Node,
  mergekLinkedList
};
