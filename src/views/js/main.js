/**
 * Module is prohibited to sales! Violation of this condition leads to the deprivation of the license!
 *
 * @author    Yandex.Money <cms@yamoney.ru>
 * @copyright © 2015-2017 NBCO Yandex.Money LLC
 * @license   https://money.yandex.ru/doc.xml?id=527052
 *
 * @category  Front Office Features
 * @package   Yandex Payment Solution
 */

$(document).ready(function () {
    $('#tabs').tabs();
    var view = $.totalStorage('tab_ya');
    if (view == null)
        $.totalStorage('tab_ya', 'money');
    else
        $('.ui-tabs-nav li a[href="#' + view + '"]').click();

    $('.ui-tabs-nav li').live('click', function () {
        var view = $(this).find('a').first().attr('href').replace('#', '');
        $.totalStorage('tab_ya', view);
    });

    var tmp = jQuery('#payment_mode_kassa');
    if (tmp.length) {
        bindModeTrigger(tmp.parents('.form-group'));
    }

    tmp = jQuery('#kassa_send_receipt_enable');
    if (tmp.length) {
        bindReceiptTrigger(tmp.parents('.form-group'));
    }
});

function bindModeTrigger(root) {
    const paymentMethodWrapper = jQuery('.payment-mode-shop').parents('.form-group');
    const eplButtonWrapper = jQuery('#YA_KASSA_PAY_LOGO_ON').parents('.form-group');
    const installmentsButtonWrapper = jQuery('#YA_KASSA_INSTALLMENTS_BUTTON_ON').parents('.form-group');
    const input = jQuery('input[name=YA_KASSA_PAYMENT_MODE]');
    input.change(function () {
        triggerMode(this.value);
    });
    if (input[0].checked) {
        triggerMode(input[0].value);
    } else if (input[1].checked) {
        triggerMode(input[1].value);
    } else {
        eplButtonWrapper.hide();
        installmentsButtonWrapper.hide();
        paymentMethodWrapper.show();
    }
    function triggerMode(value) {
        if (value == 'kassa') {
            jQuery(eplButtonWrapper).show();
            jQuery(installmentsButtonWrapper).show();
            jQuery(paymentMethodWrapper).hide();
        } else {
            jQuery(eplButtonWrapper).hide();
            jQuery(installmentsButtonWrapper).hide();
            jQuery(paymentMethodWrapper).show();
        }
    }

    const holdModeSettings = jQuery('.enable-hold-mode').parents('.form-group');
    function toggleEnableHoldMode() {
        if (jQuery('#YA_KASSA_ENABLE_HOLD_MODE_ON').is(':checked')) {
            holdModeSettings.slideDown();
        } else {
            holdModeSettings.slideUp();
        }
    }
    jQuery('#YA_KASSA_ENABLE_HOLD_MODE_ON').on('change', toggleEnableHoldMode);
    toggleEnableHoldMode();
}

function bindReceiptTrigger(root) {
    var input = jQuery('input[name=YA_KASSA_SEND_RECEIPT]');
    var wrappers = jQuery('.kassa_tax_rate').parents('.form-group');
    input.change(function () {
        triggerMode(this.value);
    });
    if (input[0].checked) {
        triggerMode(input[0].value);
    } else {
        triggerMode(input[1].value);
    }
    function triggerMode(value) {
        if (value == '0') {
            root.next().slideUp();
            root.next().next().slideUp();
            root.next().next().next().slideUp();
            root.next().next().next().next().slideUp();
            wrappers.slideUp();
        } else {
            root.next().slideDown();
            root.next().next().slideDown();
            root.next().next().next().slideDown();
            root.next().next().next().next().slideDown();
            wrappers.slideDown();
        }
    }
}
