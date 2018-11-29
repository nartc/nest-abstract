import { existsSync } from 'fs';
import { PACKAGES } from '../constants';

export class NpmHelper {
  private static readonly nodeModulesPath: string =
    process.cwd() + '/node_modules';

  static get isMongooseInstalled(): boolean {
    return (
      existsSync(this.getPath(PACKAGES.Mongoose)) &&
      existsSync(this.getPath(`@nestjs/${PACKAGES.Mongoose}`))
    );
  }

  static get isTypeOrmInstalled(): boolean {
    return (
      existsSync(this.getPath(PACKAGES.TypeOrm)) &&
      existsSync(this.getPath(`@nestjs/${PACKAGES.TypeOrm}`))
    );
  }

  static get isPassportInstalled(): boolean {
    return (
      existsSync(this.getPath(PACKAGES.Passport)) &&
      existsSync(this.getPath(`@nestjs/${PACKAGES.Passport}`))
    );
  }

  static get isSwaggerInstalled(): boolean {
    return existsSync(this.getPath(`@nestjs/${PACKAGES.Swagger}`));
  }

  private static getPath(packageName: string): string {
    return this.nodeModulesPath + '/' + packageName;
  }
}
