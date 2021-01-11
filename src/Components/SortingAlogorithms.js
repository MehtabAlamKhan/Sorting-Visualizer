//-----------------------------INSERTION SORT-----------------------------
export function insertionSortCall(arrayn, order) {
  const animations = [];
  insertionSort(arrayn, animations, order);
  // console.log(order);
  return animations;
}

function insertionSort(array, animations, order) {
  for (var i = 1; i < array.length; i++) {
    let current = array[i];
    var j = i - 1;
    animations.push([i, j]);
    animations.push([i, j]);
    if (order === "asc") {
      while (j >= 0 && array[j] > current) {
        array[j + 1] = array[j];

        animations.push([j + 1, j]);
        animations.push([j + 1, j]);
        animations.push([j + 1, j, array[j + 1], current]);
        j--;
      }
    } else {
      while (j >= 0 && array[j] < current) {
        array[j + 1] = array[j];

        animations.push([j + 1, j]);
        animations.push([j + 1, j]);
        animations.push([j + 1, j, array[j + 1], current]);
        j--;
      }
    }
    array[j + 1] = current;
    animations.push([j + 1, current, 0]);
  }
}

//-------------------------------BUBBLE SORT-----------------------------
export function bubbleSortCall(array, order) {
  const animation = [];
  bubbleSort(array, animation, order);
  return animation;
}

function bubbleSort(array, animation, order) {
  for (var i = 0; i < array.length; i++) {
    for (var j = 1; j < array.length - i; j++) {
      animation.push([j - 1, j]);
      animation.push([j - 1, j]);
      animation.push([j - 1, j]);
      if (order === "asc") {
        if (array[j - 1] > array[j]) {
          let temp = array[j - 1];
          array[j - 1] = array[j];
          array[j] = temp;
          animation.push([j - 1, j, array[j - 1], array[j]]);
        } else {
          animation.push([j - 1, j, array[j - 1], array[j]]);
        }
      } else {
        if (array[j - 1] < array[j]) {
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
}

//-------------------------------HEAP SORT----------------------------------
var length;
/* to create MAX  array */
export function heapSortCall(array, order) {
  const animations = [];
  heapSort(array, animations, order);
  return animations;
}

function heapSort(array, animations, order) {
  length = array.length;

  for (var i = Math.floor(length / 2); i >= 0; i -= 1) {
    heap_root(array, animations, i, order);
  }

  for (i = array.length - 1; i > 0; i--) {
    swap(array, 0, i);
    length--;
    animations.push([0, i, array[0], array[i]]);

    heap_root(array, animations, 0, order);
  }
}

function heap_root(array, animations, i, order) {
  var l = 2 * i + 1;
  var r = 2 * i + 2;
  var largest = i;

  if (order === "asc") {
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
  }else{
    
    if (l < length && array[l] < array[largest]) {
      largest = l;
      animations.push([i, l]);
      animations.push([i, l]);
    }
  
    if (r < length && array[r] < array[largest]) {
      largest = r;
      animations.push([i, r]);
      animations.push([i, r]);
    }
  }

  if (largest != i) {
    swap(array, i, largest);
    animations.push([i, largest, array[i], array[largest], 0]);
    heap_root(array, animations, largest,order);
  }
}

function swap(input, index_A, index_B) {
  var temp = input[index_A];

  input[index_A] = input[index_B];
  input[index_B] = temp;
}

//----------------------------------QUICKSORT-----------------------------------
export function QuickSortCall(array,order) {
  const ani = {
    animation: [],
    animation2: [],
  };

  var l = 0;
  var h = array.length;
  QuickSort(array, l, h, ani.animation, ani.animation2,order);
  return ani;
}

function QuickSort(array, l, h, animation, animation2,order) {
  if (l < h) {
    var j = partition(array, l, h, animation, animation2,order);

    QuickSort(array, l, j, animation, animation2,order);
    QuickSort(array, j + 1, h, animation, animation2,order);
  }
}

function partition(array, l, h, animation, animation2,order) {
  const pivot = array[l];
  var i = l;
  var j = h;

  while (i < j) {
    if(order==='asc'){
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
    }
    else{
      do {
        i++;
        animation2.push(i);
        animation2.push(i);
      } while (array[i] >= pivot);
      do {
        j--;
        animation2.push(j);
        animation2.push(j);
      } while (array[j] < pivot);
    }
    if (i < j) {
      animation.push([i, j]);
      animation.push([i, j]);
      animation.push([i, j]);
      
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      // animation.push([i, j, array[i], array[j]]);
      animation.push([i, j, array[i], array[j]]);
    }
  }

  let temp = array[l];
  array[l] = array[j];
  array[j] = temp;

  animation.push([l, j]);
  animation.push([l, j]);
  animation.push([l, j]);
  // animation.push([l, j, array[l], array[j]],0);
  animation.push([l, j, array[l], array[j],0]);

  return j;
}

//---------------------------------------------MERGE SORT-----------------------------------------------------//

export function mergeSort(array,order) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations,order);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,order
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations,order);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations,order);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations,order);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,order
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j,0]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j,0]);
    animations.push([i, j,0]);
    if(order==='asc'){
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k,i, auxiliaryArray[i],0]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k,j, auxiliaryArray[j],0]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }else{
      if (auxiliaryArray[i] >= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k,i, auxiliaryArray[i],0]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k,j, auxiliaryArray[j],0]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k,i, auxiliaryArray[i],0]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k,j, auxiliaryArray[j],0]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
