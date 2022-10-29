import { sha256 } from 'js-sha256'
import { Crypto } from '../abstractions/crypto/crypto'

export class Sha256Cryto implements Crypto {
    async encrypt(value: string): Promise<string> {
        return sha256(value)
    }

    async compare(normal: string, encryted: string): Promise<boolean> {
        return encryted === sha256(normal)
    }
}
