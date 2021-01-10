//-----------------------------INSERTION SORT-----------------------------
export function insertionSortCall(arrayn) {
  const animations = [];
  insertionSort(arrayn, animations);
  return animations;
}

function insertionSort(array, animations) {
  for (var i = 1; i < array.length; i++) {
    let current = array[i];
    var j = i - 1;
    animations.push([i, j]);
    animations.push([i, j]);
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];

      animations.push([j + 1, j]);
      animations.push([j + 1, j]);
      animations.push([j + 1, j, array[j + 1], current]);
      j--;
    }
    array[j + 1] = current;
    animations.push([j + 1, current, 0]);
  }
}


//-------------------------------BUBBLE SORT-----------------------------
export function bubbleSortCall(array) {
  const animation = [];
  bubbleSort(array, animation);
  return animation;
}

function bubbleSort(array, animation) {
  for (var i = 0; i < array.length; i++) {
    for (var j = 1; j < array.length - i; j++) {
      animation.push([j - 1, j]);
      animation.push([j - 1, j]);
      if (array[j - 1] > array[j]) {
        let temp = array[j - 1];
        array[j - 1] = array[j];
        array[j] = temp;
        animation.push([j - 1, j, array[j - 1], array[j]]);
      } else {
        animation.push([j - 1, j, array[j - 1], array[j]]);
      }
    }
  }
}

//-------------------------------HEAP SORT----------------------------------
var length;
/* to create MAX  array */
export function heapSortCall(array) {
  const animations = [];
  heapSort(array, animations);
  return animations;
}

function heapSort(array, animations) {
  length = array.length;

  for (var i = Math.floor(length / 2); i >= 0; i -= 1) {
    heap_root(array, animations, i);
  }

  for (i = array.length - 1; i > 0; i--) {
    swap(array, 0, i);
    length--;
    animations.push([0, i, array[0], array[i]]);

    heap_root(array, animations, 0);
  }
}

function heap_root(array, animations, i) {
  var l = 2 * i + 1;
  var r = 2 * i + 2;
  var largest = i;

  if (l < length && array[l] > array[largest]) {
    largest = l;
    animations.push([i, l]);
    animations.push([i, l]);
  }

  if (r < length && array[r] > array[largest]) {
    largest = r;
    animations.push([i, r]);
    animations.push([i, r]);
  }

  if (largest != i) {
    swap(array, i, largest);
    animations.push([i, largest, array[i], array[largest], 0]);
    heap_root(array, animations, largest);
  }
}

function swap(input, index_A, index_B) {
  var temp = input[index_A];

  input[index_A] = input[index_B];
  input[index_B] = temp;
}

//----------------------------------QUICKSORT-----------------------------------
export function QuickSortCall(array) {
  const ani = {
    animation: [],
    animation2: [],
  };

  var l = 0;
  var h = array.length;
  QuickSort(array, l, h, ani.animation, ani.animation2);
  return ani;
}

function QuickSort(array, l, h, animation, animation2) {
  if (l < h) {
    var j = partition(array, l, h, animation, animation2);

    QuickSort(array, l, j, animation, animation2);
    QuickSort(array, j + 1, h, animation, animation2);
  }
}

function partition(array, l, h, animation, animation2) {
  const pivot = array[l];
  var i = l;
  var j = h;

  while (i < j) {
    do {
      i++;
      animation2.push(i);
      animation2.push(i);
    } while (array[i] <= pivot);
    do {
      j--;
      animation2.push(j);
      animation2.push(j);
    } while (array[j] > pivot);
    if (i < j) {
      animation.push([i, j]);
      animation.push([i, j]);
      // animation.push([i, j, array[i], array[j]]);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  let temp = array[l];
  array[l] = array[j];
  array[j] = temp;

  animation.push([l, j]);
  animation.push([l, j]);
  animation.push([l, j, array[l], array[j]]);

  return j;
}

//---------------------------------------------MERGE SORT-----------------------------------------------------//

export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

