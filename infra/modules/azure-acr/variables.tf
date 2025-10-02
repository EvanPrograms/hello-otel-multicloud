variable "resource_group_name" {
  description = "Existing resource group to place ACR in"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "acr_name" {
  description = "Globally unique ACR name (lowercase alphanumerics)"
  type        = string
}
