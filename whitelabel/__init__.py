__version__ = "16.0.0"


def get_logo():
	try:
		import frappe

		if frappe.conf and frappe.conf.get("app_logo_url"):
			return frappe.conf.get("app_logo_url") or "/assets/whitelabel/images/whitelabel_logo.jpg"
		else:
			return "/assets/whitelabel/images/whitelabel_logo.jpg"
	except ImportError:
		return "/assets/whitelabel/images/whitelabel_logo.jpg"


__logo__ = get_logo()
