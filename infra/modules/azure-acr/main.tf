resource "azurerm_container_registry" "this" {
  name                = var.acr_name
  resource_group_name = var.resource_group_name
  location            = var.location

  sku           = "Basic"   # cheap for the lab
  admin_enabled = true      # handy for local pushes; disable in real prod
}
