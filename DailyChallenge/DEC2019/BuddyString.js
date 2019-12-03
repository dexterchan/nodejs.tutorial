class BuddyString {
  constructor() {}

  buddyStrings(A, B) {
    if (A.length != B.length) {
      return false;
    }
    if (A.length <= 1) {
      return false;
    }

    let buddyFound = false;
    let sameAdj = false;
    for (let i = 0; i < A.length - 1; i++) {
      if (A[i] != B[i]) {
        if (this.__isBuddy(A[i], A[i + 1], B[i], B[i + 1])) {
          if (!buddyFound) {
            buddyFound = true;
          } else {
            return false;
          }
        } else return false;
      } else {
        if (!sameAdj && this.__sameAdj(A[i], A[i + 1], B[i], B[i + 1])) {
          sameAdj = true;
        }
      }
    }
    return buddyFound || sameAdj;
  }
  __sameAdj(a0, a1, b0, b1) {
    if (a0 == a1 && b0 == b1) {
      return true;
    } else {
      return false;
    }
  }
  __isBuddy(a0, a1, b0, b1) {
    if (a0 == b1 && a1 == b0) {
      return true;
    } else {
      return false;
    }
  }
}

if (process.mainModule != null && process.mainModule.filename === __filename) {
  let res;

  const buddyString = new BuddyString();
  res = buddyString.buddyStrings("aaaaaaabc", "aaaaaaacb");
  console.log(res);
  res = buddyString.buddyStrings("aaaaaaa", "aaaaaaa");
  console.log(res);
}

module.exports.BuddyString = BuddyString;
