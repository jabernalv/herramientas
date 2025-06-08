<RouterLink
  to="/from-xls-to-sql"
  class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
>
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"
              >
                <i class="pi pi-file-excel text-xl text-green-600"></i>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">
                  Convertidor de Excel a SQL
                </h3>
                <p class="text-sm text-gray-600">
                  Convierte archivos Excel o CSV a sentencias SQL
                </p>
              </div>
            </div>
          </RouterLink>

<RouterLink
  to="/generate-uuids"
  class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
>
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"
              >
                <i class="pi pi-key text-xl text-blue-600"></i>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">
                  Generador de UUIDs
                </h3>
                <p class="text-sm text-gray-600">
                  Genera UUIDs v4 y descárgalos en Excel
                </p>
              </div>
            </div>
          </RouterLink>

<Card class="col-span-1">
  <template #title>
    <div class="flex items-center gap-2">
      <i class="pi pi-qrcode text-xl"></i>
      Generador QR
    </div>
  </template>
  <template #content>
    <p>
      Genera códigos QR personalizados para enlaces, textos o cualquier tipo de información.
    </p>
  </template>
  <template #footer>
    <div class="flex justify-end">
      <router-link to="/qr">
        <Button label="Abrir" icon="pi pi-arrow-right" />
      </router-link>
    </div>
  </template>
</Card>

<RouterLink
  to="/latex"
  class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
>
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center"
              >
                <i class="pi pi-calculator text-xl text-purple-600"></i>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">
                  Generador LaTeX
                </h3>
                <p class="text-sm text-gray-600">
                  Genera ecuaciones matemáticas en formato LaTeX
                </p>
              </div>
            </div>
          </RouterLink>

<RouterLink
  to="/qr"
  class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
>
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"
              >
                <i class="pi pi-qrcode text-xl text-green-600"></i>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">
                  Generador QR
                </h3>
                <p class="text-sm text-gray-600">
                  Genera códigos QR personalizados
                </p>
              </div>
            </div>
          </RouterLink>
