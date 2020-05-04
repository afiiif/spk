const utils = (function () {

	let $modal = {
		root: $('#modal'),
		dialog: $('#modal-dialog'),
		title: $('#modal-title'),
		btn: '',
		closeBtn: $('#modal-title + .close'),
		body: $('#modal-body'),
		footer: $('#modal-footer'),
		data: {},
		action: () => { },
		show: () => { },
		shown: () => { },
		hide: () => { },
		hidden: () => { },
		loading: (a = '<i class="fas fa-sync fa-spin mr-2"></i>Memproses...', unsetError = true) => {
			if (a === false) {
				$('#modal-btn').html($modal.btn).prop('disabled', false);
				$('[data-dismiss="modal"]').prop('disabled', false);
			}
			else {
				$('#modal-btn').html(a).prop('disabled', true);
				$('[data-dismiss="modal"]').prop('disabled', true);
				if (unsetError) $modal.error(false);
			}
		},
		error: (a = false, unsetLoadingState = true) => {
			if (a === false) $('#modal-error').hide();
			else {
				$('#modal-error').html(`<div class="px-3 py-2"><i class="fas fa-exclamation-triangle mr-2"></i>${a}</div>`).slideDown();
				if (unsetLoadingState) $modal.loading(false);
			}
		},
	};

	const modalInit = ({ title = '', body, btnLabel = 'Ok', btnClass = 'btn-info', btnDisabled = false, btnCloseLabel = 'Batal', btnCloseClass = 'btn-info btn-border', data = {}, dialogClass = '', backdrop = true, action = null, show = null, shown = null, hide = null, hidden = null }) => {

		$modal.data = data;
		$modal.btn = btnLabel;
		$modal.action = typeof action === 'function' ? action : (() => { });
		$modal.show = typeof show === 'function' ? show : (() => { });
		$modal.shown = typeof shown === 'function' ? shown : (() => { });
		$modal.hide = typeof hide === 'function' ? hide : (() => { });
		$modal.hidden = typeof hidden === 'function' ? hidden : (() => { });

		let onclick = 'data-dismiss="modal"';
		if (typeof action === 'string') onclick = `onclick="${action}"`;
		else if (typeof action === 'function') onclick = 'onclick="utils.modal.action()"';

		$modal.dialog.attr('class', 'modal-dialog').addClass(dialogClass);
		$modal.title.html(title);
		$modal.body.html(body);
		$modal.footer.html(`
			<button type="button" class="btn ${btnCloseClass}" data-dismiss="modal">${btnCloseLabel}</button>
			<button type="button" id="modal-btn" ${onclick} class="btn ${btnClass}" ${btnDisabled ? 'disabled' : ''}>${btnLabel}</button>
		`);

		$modal.root.data('bs.modal')._config.backdrop = backdrop;

		$modal.error();

		return $modal.root.modal('show').trigger('show.bs.modal');
	};

	$modal.root
		.modal('hide')
		.on('show.bs.modal', e => {
			$modal.closeBtn.prop('disabled', false);
			$('[data-toggle="tooltip"]').tooltip('hide');
			if ($.fn.selectpicker) $modal.root.find('.selectpicker').selectpicker('render');
			if ($.fn.scrollbar) $modal.root.find('.scrollbar-outer').scrollbar();
			$modal.show();
		})
		.on('shown.bs.modal', e => {
			$modal.shown();
		})
		.on('hide.bs.modal', e => {
			$modal.hide();
		})
		.on('hidden.bs.modal', e => {
			$modal.hidden();
		});

	return {
		modal: {
			init: modalInit,
			data: () => $modal.data,
			action: () => $modal.action(),
			hide: () => { $modal.root.modal('hide'); },
			loading: $modal.loading,
			error: $modal.error,
		},
	}

})();



const dbg = (a = '!', c = false) => {
	if (typeof DEV !== 'undefined') {
		if (DEV) {
			if (c === false) console.info(a);
			else console.info('%c' + a, `color: ${typeof c === 'number' ? ['#00ff7f', '#6495ed', '#ff0', '#fa8072', '#ffa500', '#f00'][c] : c}`);
		}
	}
}



$(() => {

	console.log('© Muhammad Afifudin, 2020');
	console.log('%cVersion: ' + $('script[src*="assets/js"]').prop('src').split('?v=')[1], 'color: #6495ed');

	$('body').tooltip({ selector: '[data-toggle="tooltip"]', html: true });

});
