/**
 * short localStorage
 */
const db = localStorage;

/**
 * short query selector
 *
 * @param      {<type>}  el      { parameter_description }
 * @return     {string}  { description_of_the_return_value }
 */
const _ = (el) => {
	return document.querySelector(el);
};
/**
 * Gets the tpl.
 *
 * @param      {<type>}  element  The element
 * @return     {string}  The tpl.
 */
const getTpl = (element) => {
	return tpl[element];
};

/**
 * Makes an editable.
 *
 * @return     {string}  { description_of_the_return_value }
 */
const makeEditable = () => {
	let elements = document.querySelectorAll('.drop-element');
	let toArr = Array.prototype.slice.call(elements);
	Array.prototype.forEach.call(toArr, (obj, index) => {
		if (obj.querySelector('img')) {
			return false;
		} else {
			obj.addEventListener('click', (e) => {
				e.preventDefault();
				obj.children[0].setAttribute('contenteditable', '');
				obj.focus();
			});
			obj.children[0].addEventListener('blur', (e) => {
				e.preventDefault();
				obj.children[0].removeAttribute('contenteditable');
			});
		}
	});
};
/**
 * Removes a divs to save.
 *
 * @return     {string}  { description_of_the_return_value }
 */
const removeDivsToSave = () => {
	let elements = document.querySelectorAll('.drop-element');
	let toArr = Array.prototype.slice.call(elements);
	let html = '';
	Array.prototype.forEach.call(toArr, (obj, index) => {
    obj.children[0].removeAttribute('contenteditable');
		html += obj.innerHTML;
	});
	return html;
};

/**
 * Templates
 *
 * @type  string
 */
const tpl = {
	'header1': '<h1>I am header 1</h1>',
	'header2': '<h2>I am header 2</h2>',
	'header3': '<h3>I am header 3</h3>',
	'shortparagraph': '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et</p>',
	'mediumparagraph': '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate</p>',
	'largeparagraph': '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,</p>',
	'ullist': '<ul><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li></ul>',
	'ollist': '<ol><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li></ol>',
	'image': '<img src="http://lorempixel.com/400/200/">',
  'code': '<pre>function say(name){\n return name;\n}</pre>'
};

/**
 * init dragula
 *
 * @type  function
 */
const containers = [_('.box-left'), _('.box-right')];
const drake = dragula(containers, {
	copy(el, source) {
		return source === _('.box-left');
	},
	accepts(el, target) {
		return target !== _('.box-left');
	}
});

drake.on('out', (el, container) => {
	if (container == _('.box-right')) {
		el.innerHTML = getTpl(el.getAttribute('data-tpl'));
		el.className = 'drop-element';
		makeEditable();
		db.setItem('savedData', _('.box-right').innerHTML);
	}
	if (container == _('.box-left')) {
		el.innerHTML = el.getAttribute('data-title');
	}
});
