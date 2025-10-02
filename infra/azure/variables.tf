variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "eastus"
}

variable "rg_name" {
  description = "Resource Group name"
  type        = string
  default     = "rg-hello-otel"
}

variable "acr_name" {
  description = "Azure Container Registry name (must be globally unique, 5–50 lowercase alphanumerics)"
  type        = string
  default     = "evanacr12345"
}

variable "aks_name" {
  description = "AKS cluster name"
  type        = string
  default     = "aks-hello-otel"
}
