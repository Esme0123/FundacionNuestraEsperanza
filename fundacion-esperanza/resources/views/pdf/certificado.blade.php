            <div class="folio">Folio: {{ $certificado_uuid }}</div>
            
            <div class="header">
                <div class="logo-text">Fundación Nuestra Esperanza</div>
                <h1>Certificado de Donación</h1>
            </div>

            <div class="content">
                <p class="text-intro">La Fundación Nuestra Esperanza certifica y agradece profundamente a:</p>
                
                <div class="donor-name">{{ $donante_nombre }}</div>
                
                <div class="donation-details">
                    <p>Por su generosa contribución de:</p>
                    <p class="amount">{{ $donacion_monto }}</p>
                    <p>Realizada el día <span class="date">{{ $donacion_fecha }}</span></p>
                </div>

                <div class="quote">
                    "Tu aporte hace posible que sigamos construyendo esperanza y transformando vidas."
                </div>
            </div>

            <div class="footer">
                <div class="signature-section">
                    <div class="signature-line"></div>
                    <p style="margin: 0; font-weight: bold; color: #12296C;">Dirección Ejecutiva</p>
                </div>
                <p>Fundación Nuestra Esperanza &bull; www.fundacionnuestraesperanza.org</p>
                <p>Este documento es un comprobante oficial de su donación.</p>
            </div>
        </div>
    </div>
</body>
</html>