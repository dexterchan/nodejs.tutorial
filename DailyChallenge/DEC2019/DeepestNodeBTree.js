class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
  toString() {
    return this.val;
  }
}

class Solution {
  findDeepest(node) {
    return this.__iterativeDeepest(node);
  }

  __iterativeDeepest(node) {
    let curr = node;
    let stack = [];
    stack.push([node, 1]);
    let deepestlvl = 0;
    let deepestVal = null;

    while (stack.length > 0) {
      let tNode = null;
      let lvl = 0;
      [tNode, lvl] = stack.pop();
      if (lvl > deepestlvl) {
        deepestlvl = lvl;
        deepestVal = tNode;
      }
      if (tNode.left != null) {
        stack.push([tNode.left, lvl + 1]);
      }
      if (tNode.right != null) {
        stack.push([tNode.right, lvl + 1]);
      }
    }
    return [deepestVal.toString(), deepestlvl];
  }
}

if (process.mainModule != null && process.mainModule.filename === __filename) {
  let r = new Node("a");
  r.left = new Node("b");
  r.left.left = new Node("d");
  r.right = new Node("c");

  let solu = new Solution();
  let res = solu.findDeepest(r);
  console.log(res.toString());
}
module.exports.DeepestNode = Solution;
module.exports.BNode = Node;
