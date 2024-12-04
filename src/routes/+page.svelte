<script>
 
    // Form Data
    let name = '';
    let phoneNumber = '';
    let email = '';

    let accName = '';
    let accNumber = '';
    let game = '';
    let tos = false;

    let showModal = false;
    let paymentMethod = 'bank';
    let selectedBank = '';
    let otherBank = '';
    let selectedPulsa = '';
    let selectedEmoney = '';
  
    const listBanks = ['BCA', 'MANDIRI', 'BNI', 'BRI', 'CIMB', 'DANAMON', 'BSI', 'LAINNYA'];
    const listPulsa = ['TELKOMSEL', 'XL'];
    const listEmoney = ['DANA', 'GOPAY', 'OVO', 'LINKAJA', 'SHOPEEPAY'];
    const games = ['SLOT ONLINE', 'POKER ONLINE', 'TOGEL ONLINE', 'LIVE CASINO', 'SPACEMAN', 'JUDI BOLA', 'SBOBET', 'SV388', 'JOKER123'];


    // Phone validation
    function validatePhoneNumber(phoneNumber) {

        // console.log(phoneNumber, "<<<<<<<<<<<<< phoneNumber")
        let strPhoneNumber = `0${phoneNumber.toString()}`
        // console.log(strPhoneNumber, "<<<<<<<<<<<<< strPhoneNumber")

        // console.log(strPhoneNumber.startsWith('08'), "<<<<<<<<<<<<< strPhoneNumber.startsWith('08')")
        // console.log(strPhoneNumber.length, "<<<<<<<<<<<<< strPhoneNumber.length")

        // console.log(phoneNumber.length > 7, "<<<<<<<<<<<<< phoneNumber.length > 7")
        // console.log(phoneNumber.length < 16, "<<<<<<<<<<<<< phoneNumber.length < 16")

        // console.log(strPhoneNumber.length > 7, "<<<<<<<<<<<<< strPhoneNumber.length > 7")
        // console.log(strPhoneNumber.length < 16, "<<<<<<<<<<<<< strPhoneNumber.length < 16")

        let result = strPhoneNumber.startsWith('08') && strPhoneNumber.length > 7 && strPhoneNumber.length < 16;

        // console.log(result, "<<<<<<<<<<<<< result")

        return result;
    }

    // Acc Number Validation
    function validateAccNumber(accNumber) {
        // Convert to string to check length
        let strAccNumber = accNumber.toString();
        
        // Check if length is 15 digits or less
        return strAccNumber.length <= 15;
    }


    // Handle Submit
    async function handleSubmit(event) {

        // Phone Number Validation
        if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
            alert('Masukan Nomor HP yang valid ya bossku! 📱');
            return;
        }

        // Acc Number Validation
        if (accNumber && !validateAccNumber(accNumber)) {
            alert('Masukan Nomor Rekening yang valid ya bossku! 💳');
            return;
        }

        const formData = new FormData(event.target);
        const response = await fetch('/', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.success) {
            showModal = true;
        } else {
            alert(result.error);
        }
    }
</script>

<!-- META -->
<svelte:head>
    <title>⚡ DAFTAR ⚡</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="canonical" href="https://yourdomains.site/" />
    <link rel="icon" href="/favicon.png" type="image/x-icon" />
</svelte:head>

<main class="min-h-screen justify-center">

    <!-- Form -->
    <div class="flex items-center justify-center">
        <div class="p-8 shadow-lg w-full max-w-2xl">
            <h2 class="text-2xl font-bold mb-6 text-center">⚡ DAFTAR ⚡</h2>
            <form on:submit|preventDefault={handleSubmit} action="/" method="POST" class="space-y-4">
            
                

                <div id="paymentMethod">
                    <label class="block mb-1">Metode Deposit:</label>
                    <div class="grid grid-cols-2 gap-4">
                        <label class="flex items-center justify-center p-4 border rounded-lg cursor-pointer" class:!bg-secondary={paymentMethod === 'bank'}>
                            <input type="radio" name="paymentMethod" value="bank" bind:group={paymentMethod} required class="hidden" />
                            <span class="flex items-center space-x-2">
                                <span>Bank</span>
                            </span>
                        </label>
                        <label class="flex items-center justify-center p-4 border rounded-lg cursor-pointer" class:!bg-secondary={paymentMethod === 'emoney'}>
                            <input type="radio" name="paymentMethod" value="emoney" bind:group={paymentMethod} required class="hidden" />
                            <span class="flex items-center space-x-2">
                                <span>E-money</span>
                            </span>
                        </label>
                    </div>
                </div>
                {#if paymentMethod === 'bank'}
                <div>
                    <label for="bank" class="block mb-1">Pilih Bank:</label>
                    <select id="selectedBank" name="selectedBank" bind:value={selectedBank} required class="w-full px-3 py-2 rounded-lg">
                        <option value="">Pilih Bank</option>
                        {#each listBanks as bank}
                            <option value={bank}>{bank}</option>
                        {/each}
                    </select>
                </div>
                {#if selectedBank === 'LAINNYA'}
                <div>
                    <label for="otherBank" class="block mb-1">Nama Bank:</label>
                    <input
                    type="text"
                    id="otherBank"
                    name="otherBank"
                    bind:value={otherBank}
                    required
                    class="w-full px-3 py-2 rounded-lg"
                    placeholder="Nama Bank"
                    />
                </div>
                {/if}
                <div>
                    <label for="accName" class="block mb-1">Nama Rekening:</label>
                    <input
                    type="text"
                    id="accName"
                    name="accName"
                    bind:value={accName}
                    required
                    class="w-full px-3 py-2 rounded-lg"
                    placeholder="Hotman Paris"
                    />
                </div>
                <div>
                    <label for="accNumber" class="block mb-1">No. Rekening:</label>
                    <input
                    type="number"
                    id="accNumber"
                    name="accNumber"
                    bind:value={accNumber}
                    required
                    class="w-full px-3 py-2 rounded-lg"
                    placeholder="521234785648"
                    />
                </div>
                {/if}
                {#if paymentMethod === 'emoney'}
                <div>
                    <label for="emoney" class="block mb-1">Pilih E-money:</label>
                    <select id="selectedEmoney" name="selectedEmoney" bind:value={selectedEmoney} required class="w-full px-3 py-2 rounded-lg">
                        <option value="">Pilih Wallet</option>
                        {#each listEmoney as emoney}
                            <option value={emoney}>{emoney}</option>
                        {/each}
                    </select>
                </div>
                <div>
                    <label for="accName" class="block mb-1">Nama Pemilik:</label>
                    <input
                    type="text"
                    id="accName"
                    name="accName"
                    bind:value={accName}
                    required
                    class="w-full px-3 py-2 rounded-lg"
                    placeholder="Hotman Paris"
                    />
                </div>
                <div>
                    <label for="accNumber" class="block mb-1">No. E-Money:</label>
                    <input
                    type="number"
                    id="accNumber"
                    name="accNumber"
                    bind:value={accNumber}
                    required
                    class="w-full px-3 py-2 rounded-lg"
                    placeholder="08123456789"
                    />
                </div>
                {/if}


            <div>
                <label for="phoneNumber" class="block mb-1">Nomor WA:</label>
                <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                bind:value={phoneNumber}
                required
                class="w-full px-3 py-2 rounded-lg"
                placeholder="08123456789"
                />
            </div>

            <div>
                <label for="email" class="block mb-1">Email:</label>
                <input
                type="email"
                id="email"
                name="email"
                bind:value={email}
                required
                class="w-full px-3 py-2 rounded-lg"
                placeholder="hotman@gmail.com"
                />
            </div>



            
            
            <div>
                <label for="game" class="block mb-1">Permainan:</label>
                <select
                id="game"
                name="game"
                bind:value={game}
                required
                class="w-full px-3 py-2 rounded-lg"
                >
                <option value="">Pilih Game</option>
                {#each games as gameOption}
                    <option value={gameOption}>{gameOption}</option>
                {/each}
                </select>
            </div>
            <div>
                <label for="tos" class="block mb-1">
                    <input
                    type="checkbox"
                    id="tos"
                    name="tos"
                    bind:checked={tos}
                    required
                    class="mr-2"
                    />
                    <small>Saya menyatakan bahwa saya berusia setidaknya 18 tahun atau usia legal minimum di negara tempat tinggal saya (mana yang lebih tinggi) serta telah membaca, memahami, dan menyetujui syarat dan ketentuan. Saya juga bersedia menerima email promosi.</small>
                </label>
            </div>
            <button
                type="submit"
                class="btn btn-primary btn-block uppercase">
                Submit
            </button>
            </form>
        </div>
    </div>

</main>

{#if showModal}
<div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
    <div class="bg-secondary p-8 shadow-md w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">🥳 Perdaftaran Berhasil 🥳</h3>
        <p class="mb-6">CS kami akan segera menghubungi Anda untuk konfirmasi pendaftaran.</p>
    </div>
</div>
{/if}
