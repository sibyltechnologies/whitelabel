import json

import frappe
from frappe import _
from frappe.utils import cint, floor, flt, today


def whitelabel_patch():
	# delete erpnext welcome page
	frappe.delete_doc_if_exists("Page", "welcome-to-erpnext", force=1)
	# update Welcome Blog Post
	if frappe.db.exists("Blog Post", "Welcome"):
		frappe.db.set_value("Blog Post", "Welcome", "content", "")
	update_field_label()
	if cint(get_frappe_version()) >= 13 and not frappe.db.get_single_value(
		"Whitelabel Setting", "ignore_onboard_whitelabel"
	):
		update_onboard_details()
		frappe.db.set_single_value("System Settings", "disable_system_update_notification", 1)
		frappe.db.set_single_value("System Settings", "disable_change_log_notification", 1)


def update_field_label():
	"""Update label of section break in employee doctype"""
	frappe.db.sql(
		"""Update `tabDocField` set label='ERP' where fieldname='erpnext_user' and parent='Employee'"""
	)


def get_frappe_version():
	return frappe.db.get_value("Installed Application", {"app_name": "frappe"}, "app_version").split(".")[0]


def update_onboard_details():
	"""Disable onboarding in System Settings"""
	frappe.db.set_single_value("System Settings", "enable_onboarding", 0)


def extend_bootinfo(bootinfo):
	"""extend bootinfo - attach whitelabel settings for desk"""
	if frappe.session["user"] != "Guest":
		bootinfo.whitelabel_setting = frappe.get_doc("Whitelabel Setting", "Whitelabel Setting")


@frappe.whitelist()
def ignore_update_popup():
	if not frappe.db.get_single_value("Whitelabel Setting", "disable_new_update_popup"):
		show_update_popup_update()


@frappe.whitelist()
def show_update_popup_update():
	# Disable all system update and change log notifications by default
	return
