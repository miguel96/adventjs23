export function transformTree(tree: (number | null)[]) {
  type Child = Node | null | undefined;

  interface Node {
    left: Child;
    right: Child;
    push: (number: number | null) => void;
    getDeep: (acc: number) => number;
    toMap: () => unknown;
  }
  const createNode = (value: number | null) => {
    let left: Child = undefined;
    let right: Child = undefined;
    const toMap = () => {
      if (value === null || value === undefined) {
        return null;
      }
      return {
        value: value,
        left: left?.toMap() || null,
        right: right?.toMap() || null,
      };
    };
    const getDeep = (acc: number) => {
      if (!right || !left) {
        return acc + 1;
      }
      return Math.min(right.getDeep(acc + 1), left.getDeep(acc + 1));
    };

    const push = (value: number | null) => {
      if (left === undefined) {
        left = createNode(value);
        return;
      }
      if (right === undefined) {
        right = createNode(value);
        return;
      }
      if (!right && !left) {
        throw new Error("invalid tree");
      }
      if (left === null) {
        right?.push(value);
        return;
      }
      if (right === null) {
        left?.push(value);
        return;
      }
      const leftDeep = left?.getDeep(0) || 0;
      const rightDeep = right?.getDeep(0) || 0;
      if (rightDeep < leftDeep) {
        right?.push(value);
        return;
      }
      left?.push(value);
    };
    return {
      value,
      left,
      right,
      push,
      toMap,
      getDeep,
    };
  };

  const treeNode = createNode(tree[0]);
  tree.slice(1).forEach((node) => treeNode.push(node));
  return treeNode.toMap();
}
