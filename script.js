class Node {
  constructor(value = null, prevNode = null, nextNode = null) {
    this.value = value;
    this.prevNode = prevNode;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  #size = 0;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  get size() {
    return this.#size;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      newNode.prevNode = this.tail;
      this.tail = newNode;
    }

    this.#size++;
  }

  prepend(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head.prevNode = newNode;
      this.head = newNode;
    }

    this.#size++;
  }

  print() {
    const current = this.head;

    while (current) {
      console.log(current);
      current = this.nextNode;
    }
  }

  at(index) {
    let current = this.head;

    if (index === 0) {
      return current;
    }

    for (let i = 0; i < index; i++) {
      current = current.nextNode;
      if (current === null) break;
    }
    return current;
  }

  pop() {
    const tempTail = { ...this.tail };
    this.tail.prevNode.nextNode = null;
    this.tail.prevNode = null;
    this.tail = tempTail.prevNode;
    this.#size--;
  }

  contain(value) {
    let current = this.head;

    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  find(value) {
    let current = this.head;
    let i = 0;

    while (current) {
      if (current.value === value) {
        return i;
      }
      current = current.nextNode;
      i++;
    }
    return null;
  }

  toString() {
    let current = this.head;
    let tempStr = '';

    while (current) {
      tempStr += `(${current.value}) -> `;
      current = current.nextNode;
    }
    return (tempStr += `null`);
  }

  insertAt(value, index) {
    if (index < 0 || index > this.#size) {
      throw new Error(`Index out of bound`);
    }

    const newNode = new Node(value);

    if (index === 0) {
      this.prepend(value);
    } else if (index === this.#size) {
      this.append(value);
    } else {
      const indexNode = this.at(index);
      newNode.prevNode = indexNode.prevNode;
      newNode.nextNode = indexNode;
      indexNode.prevNode.nextNode = newNode;
      indexNode.prevNode = newNode;
      this.#size++;
    }
  }

  removeAt(index) {
    if (index < 0 || index >= this.#size) {
      throw new Error(`Index out of bounds`);
    }

    // const removeNode = this.at(index);

    // if (index === 0) {
    //   removeNode.nextNode.prevNode = null;
    //   this.head = removeNode.nextNode;
    //   removeNode.nextNode = null;
    // } else if (index === this.#size - 1) {
    //   removeNode.prevNode.nextNode = null;
    //   this.tail = removeNode.prevNode;
    //   removeNode.prevNode = null;
    // } else {
    //   removeNode.prevNode.nextNode = removeNode.nextNode;
    //   removeNode.nextNode = removeNode.prevNode;
    // }
    // this.#size--;

    let removeNode;

    if (index === 0) {
      removeNode = this.head;
      this.head = removeNode.nextNode;
      if (this.head) {
        this.head.prevNode = null;
      } else {
        this.tail = null;
      }
    } else if (index === this.#size - 1) {
      removeNode = this.tail;
      this.tail = removeNode.prevNode;
      this.tail.nextNode = null;
    } else {
      removeNode = this.at(index);
      removeNode.prevNode.nextNode = removeNode.nextNode;
      removeNode.nextNode.prevNode = removeNode.prevNode;
    }
  }
}

//test
let fullList = new LinkedList();
fullList.append('test1');
fullList.append('test2');
fullList.append('test3');
fullList.append('test4');
fullList.append('test5');

fullList.removeAt(2);
fullList;
// fullList.toString();
