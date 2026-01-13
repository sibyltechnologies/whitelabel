from setuptools import find_packages, setup

# This setup.py is kept for backward compatibility
# Modern installations use pyproject.toml

setup(
	name="whitelabel",
	version="0.0.1",
	description="ERPNext Whitelabel - Customizable branding solution for ERPNext",
	author="Bhavesh Maheshwari",
	author_email="maheshwaribhavesh95863@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=["frappe"],
)
