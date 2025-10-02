output "login_server" {
  description = "ACR registry URL, e.g., evanacr12345.azurecr.io"
  value       = azurerm_container_registry.this.login_server
}
